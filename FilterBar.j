@implementation FilterBar : CPView
{
    id delegate @accessors;
    CPRadioGroup radioGroup;
}

- (id)initWithFrame:(CGRect)aFrame colHeaders:(CPArray)titles
{
    if (self = [super initWithFrame:aFrame])
    {
        var bundle = [CPBundle mainBundle],
            headerImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:@"filterBarBackground.png"] size:CGSizeMake(1, 32)],
            leftCapImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:@"MediaFilterLeftCap.png"] size:CGSizeMake(9, 19)],
            rightCapImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:@"MediaFilterRightCap.png"] size:CGSizeMake(9, 19)],
            centerImage = [[CPImage alloc] initWithContentsOfFile:[bundle pathForResource:@"MediaFilterCenter.png"] size:CGSizeMake(1, 19)],
            bezelImage = [[CPThreePartImage alloc] initWithImageSlices:[leftCapImage, centerImage, rightCapImage] isVertical:NO],
            radioImageReplace = [[CPImage alloc] init];

        [self setBackgroundColor:[CPColor colorWithPatternImage:headerImage]];

		var radioButtons = [self createRadioButtons:titles];

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
    }

    return self;
}
- (CPArray)createRadioButtons:(CPArray)titles
{
	var tempRadio = [CPRadio radioWithTitle:allName];
	[tempRadio setTag:0];
	[tempRadio setFrameOrigin:CGPointMake(minFilterBarGap, minFilterBarY)];
	[tempRadio setState:CPOnState];
	radioGroup = [tempRadio radioGroup];
	
	var radioButtons = new Array(tempRadio);
	for(var i=0;i < [titles count];i++){
		tempRadio = [CPRadio radioWithTitle:[titles objectAtIndex:i]];
		[tempRadio setRadioGroup:radioGroup];
		[tempRadio setFrameOrigin:CGPointMake(CGRectGetMaxX([radioButtons[i] frame])+minFilterBarGap, minFilterBarY)];
		[tempRadio setTag:i+1];
		radioButtons[i+1] = tempRadio;
	}
	
	return radioButtons;
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