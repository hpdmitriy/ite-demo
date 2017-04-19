neuralMesh = new NeuralMesh({
	options: {
		polygonFill: '#ffffff', // default fill color for all polygons
		polygonOpacity: 0.4, // default transparency for all polygons
		highLight: 200, // default appearance speed for all polygons
		dimLight: 200, // default fading rate for all polygons
		timeVisibility: 600, // the default glow time for all polygons
		polygonsList: [// [speed of appearance, fading speed, fill color, transparency, glow time]
			{ polygon_1:[ null, null, null, null, null ] }, // step 1
			{ polygon_2:[ null, null, null, null, null ] }, // step 2
			{ polygon_3:[ null, null, null, null, null ] }, // step 3
			{ polygon_4:[ null, null, null, null, null ] }, // step 4
			{ polygon_5:[ null, null, null, null, null ] }, // step 5
			{ polygon_6:[ null, null, null, null, null ] }, // step 6
			{ polygon_7:[ null, null, null, null, null ] }, // step 7
			{ polygon_8:[ null, null, null, null, null ] }, // step 8
			{ polygon_9:[ null, null, null, null, null ] }, // step 9
			{ polygon_3:[ null, null, null, null, null ] }, // step 10
			{ polygon_4:[ null, null, null, null, null ] }, // step 11
			{ polygon_5:[ null, null, null, null, null ] }, // step 12
			{ polygon_10:[ null, null, null, null, null ] }, // step 13
			{ polygon_11:[ null, null, null, null, null ] }, // step 14
			{ polygon_12:[ null, null, null, null, null ] }, // step 15
			{ polygon_13:[ null, null, null, null, null ] }, // step 16
			{ polygon_7:[ null, null, null, null, null ] }, // step 17
			{ polygon_8:[ null, null, null, null, null ] }, // step 18
			{ polygon_14:[ null, null, null, null, null ] }, // step 19
			{ polygon_15:[ null, null, null, null, null ] }, // step 20
			{ polygon_16:[ null, null, null, null, null ] }, // step 21
			{ polygon_15:[ null, null, null, null, null ] }, // step 22
			{ polygon_17:[ null, null, null, null, null ] }, // step 23
			{ polygon_18:[ null, null, null, null, null ] }, // step 24
			{ polygon_19:[ null, null, null, null, null ] }, // step 25
			{ polygon_20:[ null, null, null, null, null ] }, // step 26
			{ polygon_21:[ null, null, null, null, null ] }, // step 27
			{ polygon_22:[ null, null, null, null, null ] }, // step 28
			{ polygon_23:[ null, null, null, null, null ] }, // step 29
			{ polygon_24:[ null, null, null, null, null ] }, // step 30
			{ polygon_25:[ null, null, null, null, null ] }, // step 31
			{ polygon_26:[ null, null, null, null, null ] }, // step 32
			{ polygon_20:[ null, null, null, null, null ] }, // step 33
			{ polygon_21:[ null, null, null, null, null ] }, // step 34
			{ polygon_20:[ null, null, null, null, null ] }, // step 35
			{ polygon_26:[ null, null, null, null, null ] }, // step 36
			{ polygon_25:[ null, null, null, null, null ] }, // step 37
			{ polygon_27:[ null, null, null, null, null ] }, // step 38
			{ polygon_28:[ null, null, null, null, null ] }, // step 39
			{ polygon_29:[ null, null, null, null, null ] }, // step 40
			{ polygon_30:[ null, null, null, null, null ] }, // step 41
			{ polygon_31:[ null, null, null, null, null ] }, // step 42
			{ polygon_24:[ null, null, null, null, null ] }, // step 43
			{ polygon_23:[ null, null, null, null, null ] }, // step 44
			{ polygon_32:[ null, null, null, null, null ] }, // step 45
			{ polygon_33:[ null, null, null, null, null ] }  // step 46
		]
	}
});

if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '/index.php') {
	neuralMesh.init(4000);
} else if(document.getElementById('neuralMeshLoader')) {
	neuralMesh.init(1500);
}

window.addEventListener("orientationchange",neuralMesh.restart);




