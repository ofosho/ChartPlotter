/*
 * AppController.j
 * testapp
 *
 * Created by You on November 10, 2010.
 * Copyright 2010, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>
@import <AppKit/CPView.j>
@import "FilterBar.j"
@import "ListDataSource.j"
@import "globals.j"


//CPWebView changes style on _loadMainFrameURL
@implementation CPWebViewFix : CPWebView
- (void)_loadMainFrameURL
{
	[self _startedLoading];

	_ignoreLoadStart = YES;
	_ignoreLoadEnd = NO;

	_url = _mainFrameURL;
	_html = null;

	[self _load];
}
@end

@implementation AppController : CPObject
{
	CPSplitView verticalSplitter;
	CPSplitView horizontalSplitter;
	CPView scrollParentView;
	CPWebViewFix webView;
	CPTableView tableView;
	CPScrollView scrollView;
	ListDataSource listDS;
	JSObject headerColor;
	FilterBar   filterBar;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
	var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
		contentView = [theWindow contentView];
		
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
               selector:@selector(hideFilterBar:)
                   name:hideFilterBarNoti
                 object:nil];				 

	listDS = [[ListDataSource alloc] init];
	headerColor = [CPColor colorWithPatternImage:[[CPImage alloc] initWithContentsOfFile:[[CPBundle mainBundle] pathForResource:@"button-bezel-center.png"]]]; 

	filterBar = [[FilterBar alloc] initWithFrame:CGRectMake(0, 0, 400, 32)];
    [filterBar setAutoresizingMask:CPViewWidthSizable];
    [filterBar setDelegate:listDS];
	
    // create the search field
    var searchField = [[CPSearchField alloc] initWithFrame:CGRectMake(0, 10, 200, 30)];
	[searchField setEditable:YES];
	[searchField setPlaceholderString:@"search and hit enter"];
	[searchField setBordered:YES];
	[searchField setBezeled:YES];
	[searchField setFont:[CPFont systemFontOfSize:12.0]];
	[searchField setTarget:listDS];
	[searchField setAction:@selector(searchChanged:)];
	[searchField setSendsWholeSearchString:NO]; 

	// create the buttons
	var button1 = [[CPButton alloc] initWithFrame:CGRectMake(10, 40, 100, 18)];
	[button1 setTitle:@"button1"];
	[button1 sizeToFit];
	var button2 = [[CPButton alloc] initWithFrame:CGRectMake(10, 70, 100, 18)];
	[button2 setTitle:@"button2"];
	[button2 sizeToFit];
  
	// create a view to split the page by left/right
	// this view will actually hold the entire page
    verticalSplitter = [[CPSplitView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([contentView bounds]), CGRectGetHeight([contentView bounds]))];
	[verticalSplitter setDelegate:self];
	[verticalSplitter setVertical:YES]; 
	[verticalSplitter setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ]; 
	// create the left view
	var leftView = [[CPView alloc] initWithFrame:CGRectMake(0, 0, 200, CGRectGetHeight([verticalSplitter bounds]))];
	// create the right view
	var rightView = [[CPView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([verticalSplitter bounds]) - 200, CGRectGetHeight([verticalSplitter bounds]))];
	[rightView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ];
	// 1 pixel size for the splitter
	[verticalSplitter setIsPaneSplitter:YES];	

	// create a view to split the right view into top/bottom
	horizontalSplitter = [[CPSplitView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([rightView bounds]), CGRectGetHeight([rightView bounds]))];
	[horizontalSplitter setDelegate:self];
	[horizontalSplitter setVertical:NO]; 
	[horizontalSplitter setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable ]; 

	scrollParentView = [[CPView alloc] initWithFrame:CGRectMake(0.0, 0, CGRectGetWidth([horizontalSplitter bounds]), 300.0)];
    // create a CPScrollView that will contain the CPTableView
    scrollView = [[CPScrollView alloc] initWithFrame:CGRectMake(0.0, 0, CGRectGetWidth([horizontalSplitter bounds]), 300.0)];
    [scrollView setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable]; 
    // create the CPTableView
    tableView = [[CPTableView alloc] initWithFrame:[scrollView bounds]];
    [tableView setDataSource:listDS];
    [tableView setUsesAlternatingRowBackgroundColors:YES];
    [[tableView cornerView] setBackgroundColor:headerColor];
	[tableView setAllowsMultipleSelection:YES];
	[tableView setDelegate:self];
	[tableView setTarget:self];
    [tableView setDoubleAction:@selector(openIssueInNewWindow:)];

	//create webview
	webView = [[CPWebViewFix alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth([horizontalSplitter bounds])-16, CGRectGetHeight([horizontalSplitter bounds])-300)];
	//[webView setAutoresizingMask: CPViewWidthSizable | CPViewHeightSizable];
	[webView setAutoresizingMask: CPViewWidthSizable | CPViewMinYMargin | CPViewMaxYMargin];
	[webView setScrollMode:CPWebViewScrollAppKit]; 

	//combine views
	// add buttons/search bar to leftview
	[leftView addSubview:button1];
	[leftView addSubview:button2];
    [leftView addSubview:searchField];
	// add scrollView/webView to right side of page
	[scrollParentView addSubview:scrollView];
	[horizontalSplitter addSubview:scrollParentView];
	[horizontalSplitter addSubview:webView];
	// add horizontal view into right view in order to split it in half
	[rightView addSubview:horizontalSplitter];
	// add the left/right view to the veritcalview
	[verticalSplitter addSubview:leftView];
	[verticalSplitter addSubview:rightView];
	// add vertical splitter (entire page) to contentview
	[contentView addSubview:verticalSplitter];

	[theWindow orderFront:self];
	[CPMenu setMenuBarVisible:YES];
}
- (void)openIssueInNewWindow:(id)sender
{
}
- (void)tableViewSelectionDidChange:(CPNotification)aNotification
{
	//[webView setMainFrameURL:@"/tacticalLists.php"];
}
- (void)addColumns:(CPNotification)aNotification
{
	for(var i=0;i < [[listDS columnHeaders] count];i++){
		var headerKey = [[listDS columnHeaders] objectAtIndex:i];
		var desc = [CPSortDescriptor sortDescriptorWithKey:headerKey ascending:NO];
		var column = [[CPTableColumn alloc] initWithIdentifier:headerKey];
		[[column headerView] setStringValue:headerKey];
		[column setWidth:125.0];
		[column setEditable:YES];
		[column setSortDescriptorPrototype:desc];
		[[column headerView] setBackgroundColor:headerColor];
		[tableView addTableColumn:column];
	}

    [scrollView setDocumentView:tableView]; 
	[tableView reloadData]; 
}
- (void)reloadTable:(CPNotification)aNotification
{	
	[self showFilterBar];
    [tableView reloadData];	
}
- (void)showFilterBar
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
@end