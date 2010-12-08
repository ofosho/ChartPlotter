<html>
	<head>
		<link rel="stylesheet" href="../css/table.css">
		<link rel="stylesheet" href="../css/tradereport.css" />
		<!--[if IE]><script language="javascript" type="text/javascript" src="/js/excanvas.js"></script><![endif]--> 
		<script language="javascript" type="text/javascript" src="../js/dateformat.js"></script>		
		<script language="javascript" type="text/javascript" src="../js/jquery.js"></script>
		<script language="javascript" type="text/javascript" src="../js/jquery.flot.js"></script>
		<script language="javascript" type="text/javascript" src="../js/jquery.flot.selection.js"></script>	
		<script language="javascript" type="text/javascript" src="../js/jquery.flot.crosshair.js"></script>		
		<script type="text/javascript" src="../js/tradereport.js"></script>		
		<title>Plotter</title>
	</head>
	<body>
		<input id=file type=hidden value='<?php echo $_GET['file'] ?>'/>
		<input id=group type=hidden value='<?php echo $_GET['group'] ?>'/>
		<div id=main>
			<div id=fullplot>
				<div id=chart>
				<div id="placeholder" style="width:550px;height:250px;"></div>
				<div id="overview" style="width:550px;height:100px;"></div>
				</div>
				<div id="side">
					<div id="legend"></div>
					<div id="choices" style="visibility:hidden">Show:</div>
				</div>
			</div>
		</div>
		<br class=clearFloat />
		<div id="hist" class='hide'></div>
	</body>
</html>