@implementation ListDataSource : CPObject
{
	CPString searchFilter;
	JSObject selFilter;
	JSObject objs;
	JSObject objsToDisplay @accessors;
	CPArray columnHeaders @accessors;
}
- (id)init
{
	if(self = [super init])
	{
		searchFilter = nil;
		selFilter = 0;
		objs = [];
		objsToDisplay = [];
		[self getList:@""];
	}
	return self;
}
- (void)getList:(CPString)aGroup
{
	if(aGroup == allName)
		aGroup = "";

	var request = [CPURLRequest requestWithURL:requestListURL+"?group="+aGroup];
	[[CPURLConnection alloc] initWithRequest:request delegate:self];
}
- (void)connection:(CPURLConnection)aConnection didReceiveData:(CPString)data
{
	objs = [];
    var JSONLists = CPJSObjectCreateWithJSON(data);
    // loop through everything and create a dictionary in place of the JSObject adding it to the array
    for (var i = 0; i < JSONLists.length; i++)
        objs[i] = [CPDictionary dictionaryWithJSObject:JSONLists[i] recursively:NO];
		
	objsToDisplay = objs;
	
	if([objs count] && !columnHeaders){
		columnHeaders = [objs[0] allKeys];
		[[CPNotificationCenter defaultCenter]
			postNotificationName:addColumnsNoti object:nil];
	}
	else{
		[[CPNotificationCenter defaultCenter]
			postNotificationName:reloadTableNoti object:nil];
	}
}
- (void)connection:(CPURLConnection)aConnection didFailWithError:(CPString)error
{
    alert(error) ;
}
- (int)numberOfRowsInTableView:(CPTableView)tableView
{
	return [objsToDisplay count];
}
- (id)tableView:(CPTableView)tableView objectValueForTableColumn:(CPTableColumn)tableColumn row:(int)row
{
	var key = [tableColumn identifier];
	return [objsToDisplay[row] objectForKey:key];
}
- (void)tableView:(CPTableView)aTableView sortDescriptorsDidChange:(CPArray)oldDescriptors
{
    // first we figure out how we're suppose to sort, then sort the data array
    var newDescriptors = [aTableView sortDescriptors];
    [objs sortUsingDescriptors:newDescriptors];

	[aTableView reloadData];
}
- (BOOL)matchFound:(CPDictionary)aDict withString:(CPString)aString
{
	var isFound = NO;
	if(selFilter){
		if([aDict objectForKey:[columnHeaders objectAtIndex:selFilter-1]] != [CPNull null])
			if([[aDict objectForKey:[columnHeaders objectAtIndex:selFilter-1]] lowercaseString].match(aString))
				isFound = YES;
	}
	else
		for(var i=0;i < [aDict count];i++)
			if([[aDict allValues] objectAtIndex:i] != [CPNull null])
				if([[[aDict allValues] objectAtIndex:i] lowercaseString].match(aString))
					isFound = YES;
	return isFound;
}
- (void)searchChanged:(id)sender
{
    if (sender)
        searchString = [[sender stringValue]  lowercaseString];

	if(searchString){		
		objsToDisplay = [];
		var count = 0;
		for(var i=0;i < [objs count];i++)
			if([self matchFound:objs[i] withString:searchString]){
				objsToDisplay[count] = objs[i];
				count++;
			}
		[[CPNotificationCenter defaultCenter]
			postNotificationName:showFilterBarNoti object:nil];	
		[[CPNotificationCenter defaultCenter]
			postNotificationName:reloadTableNoti object:nil];
	}
	else{
		objsToDisplay = objs;
		[[CPNotificationCenter defaultCenter]
			postNotificationName:reloadTableNoti object:nil];
		[[CPNotificationCenter defaultCenter]
			postNotificationName:hideFilterBarNoti object:nil];	
	}
}
- (void) filterBarSelectionDidChange:(id)sender
{
	selFilter = [sender selectedFilter];
	[self searchChanged:nil];
}
@end