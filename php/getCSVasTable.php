<?php
	$filename = $_GET['file'];
	$group = $_GET['group'];
	echo "<table id=$filename><thead>\n\n";
	$f = fopen("../files/$group/$filename.csv", "r");
	$header = true;
	while (($line = fgetcsv($f)) !== false) {
		if($header){
			$header = false;
			echo "<tr>";
			$headers = $line;
			foreach ($line as $cell) {
					echo "<th>" . htmlspecialchars($cell) . "</th>";
			}
			echo "</tr>\n";
			echo "</thead><tbody>";
		}
		else{
			echo "<tr>";
			for ($i=0;$i < count($line);$i++) {
					echo "<td class='{$headers[$i]}'>" . htmlspecialchars($line[$i]) . "</td>";
			}
			echo "</tr>\n";
		}
	}
	fclose($f);
	echo "\n</tbody></table>";
?>