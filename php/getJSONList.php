<?php
	function perms2string($perms){
		if (($perms & 0xC000) == 0xC000) {
			// Socket
			$info = 's';
		} elseif (($perms & 0xA000) == 0xA000) {
			// Symbolic Link
			$info = 'l';
		} elseif (($perms & 0x8000) == 0x8000) {
			// Regular
			$info = '-';
		} elseif (($perms & 0x6000) == 0x6000) {
			// Block special
			$info = 'b';
		} elseif (($perms & 0x4000) == 0x4000) {
			// Directory
			$info = 'd';
		} elseif (($perms & 0x2000) == 0x2000) {
			// Character special
			$info = 'c';
		} elseif (($perms & 0x1000) == 0x1000) {
			// FIFO pipe
			$info = 'p';
		} else {
			// Unknown
			$info = 'u';
		}
		// Owner
		$info .= (($perms & 0x0100) ? 'r' : '-');
		$info .= (($perms & 0x0080) ? 'w' : '-');
		$info .= (($perms & 0x0040) ?
					(($perms & 0x0800) ? 's' : 'x' ) :
					(($perms & 0x0800) ? 'S' : '-'));
		// Group
		$info .= (($perms & 0x0020) ? 'r' : '-');
		$info .= (($perms & 0x0010) ? 'w' : '-');
		$info .= (($perms & 0x0008) ?
					(($perms & 0x0400) ? 's' : 'x' ) :
					(($perms & 0x0400) ? 'S' : '-'));
		// World
		$info .= (($perms & 0x0004) ? 'r' : '-');
		$info .= (($perms & 0x0002) ? 'w' : '-');
		$info .= (($perms & 0x0001) ?
					(($perms & 0x0200) ? 't' : 'x' ) :
					(($perms & 0x0200) ? 'T' : '-'));
		return $info;
	}
	
	function directoryToArray($directory, $recursive=true) {
		$array_items = array();
		if ($handle = opendir($directory)) {
			while (false !== ($file = readdir($handle))) {
				if ($file != "." && $file != "..") {					
					if (is_dir($directory. "/" . $file)) {
						$curdir = $file;
						if($recursive) {
							$array_items = array_merge($array_items, directoryToArray($directory. "/" . $file, $recursive));
						}
						//Code to include directories in output
						//$file = $directory . "/" . $file;
						//$array_items[] = preg_replace("/\/\//si", "/", $file);
					} else {
						$file = new SplFileInfo($directory . "/" . $file);
						if(substr($file, strrpos($file, '.') + 1) == "csv"){
							$temp = Array();
							$temp['Name'] =  basename($file->getFileName(),'.csv');
							$temp['Folder'] = basename($file->getPathInfo());
							$temp['Owner'] = (string)$file->getOwner();
							$temp['Group'] = (string)$file->getGroup();
							$temp['Size'] = (string)$file->getSize();
							$temp['Modified'] = date("F j, Y, g:i a",$file->getMTime());
							$temp['Permissions'] = perms2string($file->getPerms());
							$array_items[] = $temp;
						}
					}
				}
			}
			closedir($handle);
		}
		return $array_items;
	}

	$files = directoryToArray("../files/". $_GET['group']);
	echo json_encode($files);
?>