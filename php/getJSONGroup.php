<?php
	$dir_iterator = new DirectoryIterator("../files");

	$groups = Array();
	foreach ($dir_iterator as $file) {
		if($file->isDir() && $file->getFilename() != ".." && $file->getFilename() != ".")
			$groups[] = $file->getFilename();
	}
	
	sort($groups);
	$groups = array_merge(Array("All"),$groups);
	
	echo json_encode($groups);
?>