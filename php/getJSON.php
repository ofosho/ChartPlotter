<?php
	$files = array();
	if ($handle = opendir('../files/.')) {
		while (false !== ($file = readdir($handle))) {
			if ($file != "." && $file != "..") {
				$files[] =  basename($file,'.csv');
			}
		}
		closedir($handle);
	}
	echo json_encode($files);
?>