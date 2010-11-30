/*
 * AppController.j
 * testapp
 *
 * Created by You on November 10, 2010.
 * Copyright 2010, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>

requestURL = @"php/getJSON.php";
addColumnsNoti = @"AddColumnsNotification";
reloadTableNoti = @"ReloadTableNotification";
hideFilterBarNoti = @"HideFilterBarNotification";

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


@import <AppKit/CPView.j>

FilterAll = 0;
FilterTitle = 1;
FilterBody = 2;
FilterLabels = 3;
FilterCreator = 4;

@implementation FilterBar : CPView
{
    id delegate @accessors;
    CPRadioGroup radioGroup;
}

- (id)initWithFrame:(CGRect)aFrame
{
    if (self = [super initWithFrame:aFrame])
    {
        var bundle = [CPBundle mainBundle],
            headerImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:"filterBarBackground.png"] size:CGSizeMake(1, 32)],
            leftCapImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:@"MediaFilterLeftCap.png"] size:CGSizeMake(9, 19)],
            rightCapImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:@"MediaFilterRightCap.png"] size:CGSizeMake(9, 19)],
            centerImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:@"MediaFilterCenter.png"] size:CGSizeMake(1, 19)],
            bezelImage = [[CPThreePartImage alloc] initWithImageSlices:[leftCapImage, centerImage, rightCapImage] isVertical:NO],
            radioImageReplace = [[CPImage alloc] init];

        [self setBackgroundColor:[CPColor colorWithPatternImage:headerImage]];

        var allRadio = [CPRadio radioWithTitle:@"All"],
            titleRadio = [CPRadio radioWithTitle:@"Title"],
            bodyRadio = [CPRadio radioWithTitle:@"Body"],
            labelsRadio = [CPRadio radioWithTitle:@"Labels"],
            creatorRadio = [CPRadio radioWithTitle:@"Creator"],
            radioButtons = [allRadio, titleRadio, bodyRadio, creatorRadio, labelsRadio];

        for (var i=0, count = radioButtons.length; i < count; i++)
        {
            var thisRadio = radioButtons[i];

            [thisRadio setAlignment:CPCenterTextAlignment];
            [thisRadio setValue:radioImageReplace forThemeAttribute:@"image"];
            [thisRadio setValue:1 forThemeAttribute:@"image-offset"];

            [thisRadio setValue:[CPColor colorWithPatternImage:bezelImage] forThemeAttribute:@"bezel-color" inState:CPThemeStateSelected]
            [thisRadio setValue:CGInsetMake(0.0, 10.0, 0.0, 10.0) forThemeAttribute:@"content-inset"];
            [thisRadio setValue:CGSizeMake(0.0, 19.0) forThemeAttribute:@"min-size"];

            [thisRadio setValue:CGSizeMake(0.0, 1.0) forThemeAttribute:@"text-shadow-offset" inState:CPThemeStateBordered];
            [thisRadio setValue:[CPColor colorWithCalibratedWhite:79.0 / 255.0 alpha:1.0] forThemeAttribute:@"text-color"];
            [thisRadio setValue:[CPColor colorWithCalibratedWhite:240.0 / 255.0 alpha:1.0] forThemeAttribute:@"text-shadow-color"];
            [thisRadio setValue:[CPColor colorWithCalibratedWhite:1.0 alpha:1.0] forThemeAttribute:@"text-color" inState:CPThemeStateSelected];
            [thisRadio setValue:[CPColor colorWithCalibratedWhite:79 / 255.0 alpha:1.0] forThemeAttribute:@"text-shadow-color" inState:CPThemeStateSelected];

            [thisRadio sizeToFit];

            [thisRadio setTarget:self];
            [thisRadio setAction:@selector(filterBy:)];

            [self addSubview:thisRadio];
        }

        radioGroup = [allRadio radioGroup];
        [titleRadio setRadioGroup:radioGroup];
        [bodyRadio setRadioGroup:radioGroup];
        [labelsRadio setRadioGroup:radioGroup];
        [creatorRadio setRadioGroup:radioGroup];

        [allRadio setTag:FilterAll];
        [titleRadio setTag:FilterTitle];
        [bodyRadio setTag:FilterBody];
        [creatorRadio setTag:FilterCreator];
        [labelsRadio setTag:FilterLabels];

        [allRadio setFrameOrigin:CGPointMake(8, 6)];
        [titleRadio setFrameOrigin:CGPointMake(CGRectGetMaxX([allRadio frame]) + 8, CGRectGetMinY([allRadio frame]))];
        [bodyRadio setFrameOrigin:CGPointMake(CGRectGetMaxX([titleRadio frame]) + 8, CGRectGetMinY([titleRadio frame]))];
        [creatorRadio setFrameOrigin:CGPointMake(CGRectGetMaxX([bodyRadio frame]) + 8, CGRectGetMinY([bodyRadio frame]))];
        [labelsRadio setFrameOrigin:CGPointMake(CGRectGetMaxX([creatorRadio frame]) + 8, CGRectGetMinY([creatorRadio frame]))];

        [allRadio setState:CPOnState];
    }

    return self;
}

- (unsigned)selectedFilter
{
    return [[radioGroup selectedRadio] tag];
}

- (void)filterBy:(id)sender
{
    [delegate filterBarSelectionDidChange:self];
}

@end

@implementation TradeDataSource : CPObject
{
    CPString fromUser   @accessors;
    CPString text       @accessors;
	JSObject trades;
	JSObject tradesToDisplay;
	CPArray columnHeaders @accessors;
}
- (id)init
{
	if(self = [super init])
	{
		trades = [];
		tradesToDisplay = [];
		[self getTrades];
	}
	return self;
}
- (void)getTrades
{
	var request = [CPURLRequest requestWithURL:requestURL];
	[[CPURLConnection alloc] initWithRequest:request delegate:self];
}
- (void)connection:(CPURLConnection)aConnection didReceiveData:(CPString)data
{
    var JSONTrades = CPJSObjectCreateWithJSON(data);
    // loop through everything and create a dictionary in place of the JSObject adding it to the array
    for (var i = 0; i < JSONTrades.length; i++)
        trades[i] = [CPDictionary dictionaryWithJSObject:JSONTrades[i] recursively:NO];
		
	tradesToDisplay = trades;
	
	if([trades count])
		columnHeaders = [trades[0] allKeys];
	
	[[CPNotificationCenter defaultCenter]
        postNotificationName:addColumnsNoti object:nil];
}
- (void)connection:(CPURLConnection)aConnection didFailWithError:(CPString)error
{
    alert(error) ;
}
- (int)numberOfRowsInTableView:(CPTableView)tableView
{
	return [tradesToDisplay count];
}
- (id)tableView:(CPTableView)tableView objectValueForTableColumn:(CPTableColumn)tableColumn row:(int)row
{
	var key = [tableColumn identifier];
	return [tradesToDisplay[row] objectForKey:key];
}
// when the sort descriptor changes we need to sort our data
- (void)tableView:(CPTableView)aTableView sortDescriptorsDidChange:(CPArray)oldDescriptors
{
    // first we figure out how we're suppose to sort, then sort the data array
    var newDescriptors = [aTableView sortDescriptors];
    [trades sortUsingDescriptors:newDescriptors];

    // the reload the table data
	[aTableView reloadData];
}
- (BOOL)matchFound:(CPDictionary)aDict withString:(CPString)aString
{
	var isFound = NO;
	for(var i=0;i < [aDict count];i++)
		if([[aDict allValues] objectAtIndex:i] != [CPNull null])
			if([[[aDict allValues] objectAtIndex:i] lowercaseString].match(aString))
				isFound = YES;
	return isFound;
}
- (void)searchChanged:(id)sender
{
	var searchString;
    if (sender)
        searchString = [[sender stringValue]  lowercaseString];

	if(searchString){		
		tradesToDisplay = [];
		var count = 0;
		for(var i=0;i < [trades count];i++)
			if([self matchFound:trades[i] withString:searchString]){
				tradesToDisplay[count] = trades[i];
				count++;
			}
		[[CPNotificationCenter defaultCenter]
			postNotificationName:reloadTableNoti object:nil];
	}
	else{
		tradesToDisplay = trades;
		[[CPNotificationCenter defaultCenter]
			postNotificationName:reloadTableNoti object:nil];
		[[CPNotificationCenter defaultCenter]
			postNotificationName:hideFilterBarNoti object:nil];	
	}
}
- (void) filterBarSelectionDidChange:(id)sender
{
	console.log('add code here');
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
	TradeDataSource tradeDS;
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

	tradeDS = [[TradeDataSource alloc] init];
	headerColor = [CPColor colorWithPatternImage:[[CPImage alloc] initWithContentsOfFile:[[CPBundle mainBundle] pathForResource:@"button-bezel-center.png"]]]; 

	filterBar = [[FilterBar alloc] initWithFrame:CGRectMake(0, 0, 400, 32)];
    [filterBar setAutoresizingMask:CPViewWidthSizable];
    [filterBar setDelegate:tradeDS];
	
    // create the search field
    var searchField = [[CPSearchField alloc] initWithFrame:CGRectMake(0, 10, 200, 30)];
	[searchField setEditable:YES];
	[searchField setPlaceholderString:@"search and hit enter"];
	[searchField setBordered:YES];
	[searchField setBezeled:YES];
	[searchField setFont:[CPFont systemFontOfSize:12.0]];
	[searchField setTarget:tradeDS];
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
    [tableView setDataSource:tradeDS];
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
	//[webView setMainFrameURL:@"/tacticalTrades.php"];
}
- (void)addColumns:(CPNotification)aNotification
{
	for(var i=0;i < [[tradeDS columnHeaders] count];i++){
		var headerKey = [[tradeDS columnHeaders] objectAtIndex:i];
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