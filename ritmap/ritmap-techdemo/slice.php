<?php
/*
 *  wirelesslocation - An API providing simple off-line location services to
 *  applications using the relative signal strengths from known surrounding 802.11 stations.
 *  Copyright (C) 2009  Michael Powers (swedishborgie@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
//This is a PHP "tile-izer". It will take one set of large images and slice it into tiles
//of the given size.
$dh = dir(".");
$tileSize = 256;
$i=1;
while(($file=$dh->read())!==false) {
	if(strstr($file,"new")!==false) {
		$img = imagecreatefrompng($file);
		$width = imagesx($img);
		$height = imagesy($img);
		
		for($x=0;$x<$width;$x+=$tileSize) {
			for($y=0;$y<$height;$y+=$tileSize) {
				$tile = imagecreatetruecolor($tileSize,$tileSize);
				//imagecopy  ( resource $dst_im  , resource $src_im  , int $dst_x  , int $dst_y  , int $src_x  , int $src_y  , int $src_w  , int $src_h  )
				imagecopy($tile,$img,0,0,$x,$y,256,256);
				imagepng($tile,"tiles/floor$i-".($x/256)."-".($y/256).".png");
			}
		}
		$i++;
	}
}
?>
