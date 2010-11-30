/*
 * AppController.j
 * testapp
 *
 * Created by You on November 10, 2010.
 * Copyright 2010, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>

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
		tradeToDisplay = [];
		[self getTrades];
	}
	return self;
}
- (void)getTrades
{
	var request = [CPURLRequest requestWithURL:"php/getJSONTrades.php"];
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
        postNotificationName:@"AddColumnsNotification" object:nil];
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
	var searchString = [[sender stringValue] lowercaseString];
	tradesToDisplay = [];
	var count = 0;
	for(var i=0;i < [trades count];i++)
		if([self matchFound:trades[i] withString:searchString]){
			tradesToDisplay[count] = trades[i];
			count++;
		}
	[[CPNotificationCenter defaultCenter]
        postNotificationName:@"ReloadTableNotification" object:nil];
}
@end

@implementation AppController : CPObject
{
	CPSplitView verticalSplitter;
	CPSplitView horizontalSplitter;
	CPWebViewFix webView;
	CPTableView tableView;
	TradeDataSource tradeDS;
	var headerColor;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
	var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
		contentView = [theWindow contentView];
		
	[[CPNotificationCenter defaultCenter ]
            addObserver:self
               selector:@selector(reloadTable:)
                   name:@"ReloadTableNotification" 
                 object:nil];
				 
	[[CPNotificationCenter defaultCenter ]
            addObserver:self
               selector:@selector(addColumns:)
                   name:@"AddColumnsNotification" 
                 object:nil];

	tradeDS = [[TradeDataSource alloc] init];
	headerColor = [CPColor colorWithPatternImage:[[CPImage alloc] initWithContentsOfFile:[[CPBundle mainBundle] pathForResource:@"button-bezel-center.png"]]]; 
				 
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

    // create a CPScrollView that will contain the CPTableView
    var scrollView = [[CPScrollView alloc] initWithFrame:CGRectMake(0.0, 0, CGRectGetWidth([horizontalSplitter bounds]), 300.0)];
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
	
	// combine scroll/table views
    [scrollView setDocumentView:tableView]; 

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
	[horizontalSplitter addSubview:scrollView];
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
	[webView setMainFrameURL:@"/tacticalTrades.php"];
}
- (void)tableViewSelectionDidChange:(CPNotification)aNotification
{
}
- (void)addColumns:(CPNotification)aNotification
{
	console.log('testing');
	console.log([tradeDS columnHeaders]);

	//[tableView reloadData]; 
}
- (void)reloadTable:(CPNotification)aNotification
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
    [tableView reloadData];  
}
@end