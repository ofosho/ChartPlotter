/*
 * AppController.j
 * ChartPlotter
 *
 * Created by ofosho on November 10, 2010.
 * Copyright 2010, OTech Engineering Inc All rights reserved.
 */

@import <Foundation/CPObject.j>
@import <AppKit/CPView.j>
@import "FilterBar.j"
@import "ListDataSource.j"
@import "GroupDataSource.j"
@import "globals.j"

//CPWebView with style change to ScrollAppKit
//and setRepresentedObject method for collectionview
@implementation DetailsWebView : CPWebView
- (void)_loadMainFrameURL
{
	[self _startedLoading];
	
	//[self setScrollMode:CPWebViewScrollAppKit]; 
	_iframe.setAttribute("scrolling", "no");

	_ignoreLoadStart = YES;
	_ignoreLoadEnd = NO;

	_url = _mainFrameURL;
	_html = null;

	[self _load];
}
- (void)setRepresentedObject:(id)anObject
{
	[self setMainFrameURL:anObject];
}
@end
@implementation AppController : CPObject
{
	CPSplitView verticalSplitter;
	CPSplitView horizontalSplitter;
	CPView scrollParentView;
	CPView leftView;
	CPView rightView;
	CPSearchField searchField;
	DetailsWebView webView;
	CPTableView tableView;
	CPTableView groupView;
	CPScrollView scrollView;
	CPScrollView groupScrollView;
	ListDataSource listDS;
	GroupDataSource groupDS;
	JSObject headerColor;
	FilterBar   filterBar;
}
- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
	var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
		contentView = [theWindow contentView];

	listDS = [[ListDataSource alloc] init];
	groupDS = [[GroupDataSource alloc] init];
	headerColor = [CPColor colorWithPatternImage:[[CPImage alloc] initWithContentsOfFile:[[CPBundle mainBundle] pathForResource:@"button-bezel-center.png"]]]; 

	[self initNotifications];	
	[self createSearchField];
	[self splitPage:[contentView bounds]];
	[self createGroupView];
	[self createListView];
	[self createWebView];

	[self combineViews];
	
	// add vertical splitter (entire page) to contentview
	[contentView addSubview:verticalSplitter];

	[self createMenu];
	[theWindow orderFront:self];
}
- (void)initNotifications
{
	[[CPNotificationCenter defaultCenter ]
            addObserver:self
               selector:@selector(reloadGroups:)
                   name:reloadGroupsNoti
                 object:nil];
				 
	[[CPNotificationCenter defaultCenter ]
            addObserver:self
               selector:@selector(reloadTable:)
                   name:reloadTableNoti
                 object:nil];
				 
	[[CPNotificationCenter defaultCenter ]
            addObserver:self
               selector:@selector(addColumns:)
                   name:addColumnsNoti 
                 object:nil];

	[[CPNotificationCenter defaultCenter ]
            addObserver:self
               selector:@selector(showFilterBar:)
                   name:showFilterBarNoti
                 object:nil];
				 
	[[CPNotificationCenter defaultCenter ]
            addObserver:self
               selector:@selector(hideFilterBar:)
                   name:hideFilterBarNoti
                 object:nil];
}
- (@action)openDetailInNewWindow:(id)sender
{
	var newWindow = [[CPWindow alloc] initWithContentRect:CGRectMake(100, 100, 800, 600) styleMask:CPTitledWindowMask|CPClosableWindowMask|CPMiniaturizableWindowMask|CPResizableWindowMask];
	[newWindow setMinSize:CGSizeMake(300, 300)];

	var platformWindow = [[CPPlatformWindow alloc] initWithContentRect:CGRectMake(100, 100, 800, 600)];
	[newWindow setPlatformWindow:platformWindow];
	[newWindow setFullBridge:YES];

	var contentView = [newWindow contentView],
		webViewWin = [[DetailsWebView alloc] initWithFrame:[contentView bounds]];

	[webViewWin setAutoresizingMask:CPViewWidthSizable|CPViewHeightSizable];
	[contentView addSubview:webViewWin];

	[newWindow orderFront:self];
	[newWindow setDelegate:webViewWin];
	
	var i = [[tableView selectedRowIndexes] firstIndex];
	var row = [[listDS objsToDisplay] objectAtIndex:i];
	[webViewWin setMainFrameURL:@"php/tradeReport.php?group="+[row objectForKey:groupColHeaderName]+"&file="+[row objectForKey:"Name"]];
}
- (@action)openDetailsInNewWindow:(id)sender
{
	var platformWindow = [[CPPlatformWindow alloc] initWithContentRect:CGRectMake(0, 0, 600, 800)];
	var newWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
	[newWindow setPlatformWindow:platformWindow];
	[newWindow setFullBridge:YES];
	[newWindow orderFront:self];
	var contentView = [newWindow contentView],
		bounds = [contentView bounds];
	
	var detsView = [[CPCollectionView alloc] initWithFrame:bounds];       
	[detsView setAutoresizingMask:CPViewWidthSizable];
	[detsView setMinItemSize:CGSizeMake(collViewWidth, collViewHeight)];
	[detsView setMaxItemSize:CGSizeMake(collViewWidth, collViewHeight)];
	
	var itemPrototype = [[CPCollectionViewItem alloc] init],
            detView = [[DetailsWebView alloc] initWithFrame:CGRectMakeZero()];
        
    [itemPrototype setView:detView];       
    [detsView setItemPrototype:itemPrototype];
	
	var scrollViewDetails = [[CPScrollView alloc] initWithFrame:bounds];       
	[scrollViewDetails setDocumentView:detsView];
	[scrollViewDetails setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable];
	[scrollViewDetails setAutohidesScrollers:YES];
	[contentView addSubview:scrollViewDetails];

	var urls = [];
	if([sender title] == showAll){
		for(var i=0;i < [[listDS objsToDisplay] count];i++){
			var row = [[listDS objsToDisplay] objectAtIndex:i];		
			urls[i] = @"php/tradeReport.php?group="+[row objectForKey:groupColHeaderName]+"&file="+[row objectForKey:"Name"];
		}
	}
	else{
		var indices = [tableView selectedRowIndexes];
		var index = [indices firstIndex];
		for(var i=0;i < [indices count];i++){			
			var row = [[listDS objsToDisplay] objectAtIndex:index];		
			urls[i] = @"php/tradeReport.php?group="+[row objectForKey:groupColHeaderName]+"&file="+[row objectForKey:"Name"];		
			index = [indices indexGreaterThanIndex:index];
		}
	}
	[detsView setContent:urls];
}
- (void)tableViewSelectionDidChange:(CPNotification)aNotification
{
	if(groupView === [aNotification object]){
		var i = [[[aNotification object] selectedRowIndexes] firstIndex];
		[listDS getList:[[groupDS objs] objectAtIndex:i]];
		[searchField setStringValue:@""];
		[self hideFilterBar:nil];
	}
	else{
		var i = [[[aNotification object] selectedRowIndexes] firstIndex];
		if(i > -1){
			var row = [[listDS objsToDisplay] objectAtIndex:i];
			[webView setMainFrameURL:@"php/tradeReport.php?group="+[row objectForKey:groupColHeaderName]+"&file="+[row objectForKey:"Name"]];
		}
	}
}
- (void)reloadTable:(CPNotification)aNotification
{	
    [tableView reloadData];	
}
- (void)reloadGroups:(CPNotification)aNotification
{	
    [groupView reloadData];	
}
- (void)hideFilterBar:(CPNotification)aNotification
{
    if (![filterBar superview])
        return;

    [filterBar removeFromSuperview];

    var frame = [scrollView frame];
    frame.origin.y = 0;
    frame.size.height += 32;
	
    [scrollView setFrame:frame];
}
- (void)showFilterBar:(CPNotification)aNotification
{
    if ([filterBar superview])
        return;

    [filterBar setFrame:CGRectMake(0, 0, CGRectGetWidth([scrollParentView frame]), 32)];
    [scrollParentView addSubview:filterBar];

    var frame = [scrollView frame];
    frame.origin.y = 32;
    frame.size.height -= 32;
	
    [scrollView setFrame:frame];
}
- (void)addColumns:(CPNotification)aNotification
{
	for(var i=0;i < [[listDS columnHeaders] count];i++){
		var headerKey = [[listDS columnHeaders] objectAtIndex:i];
		var desc = [CPSortDescriptor sortDescriptorWithKey:headerKey ascending:NO];
		var column = [[CPTableColumn alloc] initWithIdentifier:headerKey];
		[[column headerView] setStringValue:headerKey];
		[column setWidth:140.0];
		[column setEditable:YES];
		[column setSortDescriptorPrototype:desc];
		[[column headerView] setBackgroundColor:headerColor];
		[tableView addTableColumn:column];
	}

    [scrollView setDocumentView:tableView]; 
	[tableView reloadData]; 
	[self createFilterBar];
}
- (void)createMenu
{
    [CPMenu setMenuBarVisible:YES];
	var theMenu = [[CPApplication sharedApplication] mainMenu];
	
	var showAllMenuItem = [[CPMenuItem alloc] initWithTitle:showAll action:@selector(openDetailsInNewWindow:) keyEquivalent:nil];
	[theMenu insertItem:showAllMenuItem atIndex: 0];
	
	var showSelMenuItem = [[CPMenuItem alloc] initWithTitle:showSel action:@selector(openDetailsInNewWindow:) keyEquivalent:nil];
	[theMenu insertItem:showSelMenuItem atIndex: 1]

	[theMenu removeItemAtIndex:[theMenu indexOfItemWithTitle: @"New" ]];
	[theMenu removeItemAtIndex:[theMenu indexOfItemWithTitle: @"Open"]];
	[theMenu removeItemAtIndex:[theMenu indexOfItemWithTitle: @"Save"]];
}
- (void)createGroupView
{
	groupScrollView = [[CPScrollView alloc] initWithFrame:CGRectMake(0, 50, CGRectGetWidth([leftView bounds]), CGRectGetHeight([leftView bounds])-50)];
	[groupScrollView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable];
	[groupScrollView setAutohidesScrollers:YES];

	groupView = [[CPTableView alloc] initWithFrame:[groupScrollView bounds]];
	[groupView setIntercellSpacing:CGSizeMakeZero()];
    [groupView setHeaderView:nil];
    [groupView setCornerView:nil];
	[groupView setDelegate:self];
	[groupView setDataSource:groupDS];
	[groupView setAllowsEmptySelection:NO];
	[groupView setBackgroundColor:[CPColor colorWithHexString:@"EBF3F5"]];

    var column = [[CPTableColumn alloc] initWithIdentifier:groupColId];
    [column setWidth:220.0];
    [column setMinWidth:50.0];
    
    [groupView addTableColumn:column];
    [groupView setColumnAutoresizingStyle:CPTableViewLastColumnOnlyAutoresizingStyle];
    [groupView setRowHeight:26.0];
	
	[groupScrollView setDocumentView:groupView];
}
- (void)createListView
{
	//create view to hold scrollView and filterBar
	scrollParentView = [[CPView alloc] initWithFrame:CGRectMake(0.0, 0, CGRectGetWidth([horizontalSplitter bounds]), 300.0)];
    // create a CPScrollView that will contain the CPTableView
    scrollView = [[CPScrollView alloc] initWithFrame:CGRectMake(0.0, 0, CGRectGetWidth([horizontalSplitter bounds]), 300.0)];
    [scrollView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable]; 
    // create the CPTableView
    tableView = [[CPTableView alloc] initWithFrame:[scrollView bounds]];
    [tableView setDataSource:listDS];
	[tableView setAllowsEmptySelection:NO];
    [tableView setUsesAlternatingRowBackgroundColors:YES];
    [[tableView cornerView] setBackgroundColor:headerColor];
	[tableView setAllowsMultipleSelection:YES];
	[tableView setDelegate:self];
	[tableView setTarget:self];
    [tableView setDoubleAction:@selector(openDetailInNewWindow:)];
}
- (void)createWebView
{
	webView = [[DetailsWebView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([horizontalSplitter bounds])-16, CGRectGetHeight([horizontalSplitter bounds])-300)];
	[webView setAutoresizingMask: CPViewWidthSizable | CPViewMinYMargin | CPViewMaxYMargin];
}
- (void)createSearchField
{
    searchField = [[CPSearchField alloc] initWithFrame:CGRectMake(0, 10, 200, 30)];
	[searchField setEditable:YES];
	[searchField setPlaceholderString:@"search and hit enter"];
	[searchField setBordered:YES];
	[searchField setBezeled:YES];
	[searchField setFont:[CPFont systemFontOfSize:12.0]];
	[searchField setTarget:listDS];
	[searchField setAction:@selector(searchChanged:)];
	[searchField setSendsWholeSearchString:NO]; 
}
- (void)createFilterBar
{
	filterBar = [[FilterBar alloc] initWithFrame:CGRectMake(0, 0, 400, 32) colHeaders:[listDS columnHeaders]];
    [filterBar setAutoresizingMask:CPViewWidthSizable];
    [filterBar setDelegate:listDS];
}
- (void)splitPage:(CGRect)aBounds
{
	// create a view to split the page by left/right
	verticalSplitter = [[CPSplitView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(aBounds), CGRectGetHeight(aBounds))];
	[verticalSplitter setDelegate:self];
	[verticalSplitter setVertical:YES]; 
	[verticalSplitter setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ];
	[verticalSplitter setIsPaneSplitter:YES]; //1px splitter line	

	//create left/right views
	leftView = [[CPView alloc] initWithFrame:CGRectMake(0, 0, 200, CGRectGetHeight([verticalSplitter bounds]))];
	[leftView setBackgroundColor:[CPColor colorWithHexString:@"CCDDDD"]];
	rightView = [[CPView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([verticalSplitter bounds]) - 200, CGRectGetHeight([verticalSplitter bounds]))];
	[rightView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ];

	// create a view to split the right view into top/bottom
	horizontalSplitter = [[CPSplitView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([rightView bounds]), CGRectGetHeight([rightView bounds]))];
	[horizontalSplitter setDelegate:self];
	[horizontalSplitter setVertical:NO]; 
	[horizontalSplitter setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ]; 
}
- (void)combineViews
{
	// add search bar/groups to leftview
    [leftView addSubview:searchField];
	[leftView addSubview:groupScrollView];
	
	// add scrollView/webView to right side of page
	[scrollParentView addSubview:scrollView];
	[horizontalSplitter addSubview:scrollParentView];
	[horizontalSplitter addSubview:webView];
	
	// add horizontal view into right view in order to split top/bottom
	[rightView addSubview:horizontalSplitter];
	
	// add the left/right view to the veritcalview
	[verticalSplitter addSubview:leftView];
	[verticalSplitter addSubview:rightView];
}
@end
