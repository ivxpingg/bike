
var EXAMPLE_URL = "http://api.map.baidu.com/library/MarkerClusterer/1.2/examples/";
var map = new BMap.Map("mapDiv1");
map.enableScrollWheelZoom();
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 4);

var map2 = new BMap.Map("mapDiv2");
map2.enableScrollWheelZoom();
map2.centerAndZoom(point, 4);

map.addEventListener("zoomend", function () {
    map2.zoomTo(map.getZoom());
    map2.panTo(map.getCenter());
});

map.addEventListener("moveend", function () {
    map2.zoomTo(map.getZoom());
    map2.panTo(map.getCenter());
});

var MAX = 10;
var markers = [];
var pt = null;
var i = 0;
for (; i < MAX; i++) {
    pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
    markers.push(new BMap.Marker(pt));

    map2.addOverlay(new BMap.Marker(pt));
}
//最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});

//更改一些参数设置，比如GridSize， maxZoom
var btnOpen = document.getElementById('btnText');
btnOpen.onclick = function (event) {
    markerClusterer.setGridSize(100);
};

var newPt = new BMap.Point(116.404, 39.895);
var btnClose = document.getElementById('btnPoint');
btnClose.onclick = function () {
    markerClusterer.setMaxZoom(7);
};

var myStyles = [{
    url: EXAMPLE_URL + 'images/heart30.png',
    size: new BMap.Size(30, 26),
    opt_anchor: [16, 0],
    textColor: '#ff00ff',
    opt_textSize: 10
}, {
    url: EXAMPLE_URL + 'images/heart40.png',
    size: new BMap.Size(40, 35),
    opt_anchor: [40, 35],
    textColor: '#ff0000',
    opt_textSize: 12
}, {
    url: EXAMPLE_URL + 'images/heart50.png',
    size: new BMap.Size(50, 44),
    opt_anchor: [32, 0],
    textColor: 'white',
    opt_textSize: 14
}];

var btnStyles = document.getElementById('btnStyles');
btnStyles.onclick = function (event) {
    markerClusterer.setStyles(myStyles);
};

//添加和删除Markers
var newMarkers = getNewMarkers(MAX);
var newMarkers2 = newMarkers;

var btnAddMarkers = document.getElementById('btnAddMarkers');
btnAddMarkers.onclick = function (event) {
    if(!newMarkers.length){
        //如果之前的markers被清空了，则重新生成
        newMarkers = getNewMarkers(MAX);
        newMarkers2 = newMarkers;
    };
    markerClusterer.addMarkers(newMarkers);
    for (i = 0; i < MAX; i++) {
        map2.addOverlay(newMarkers2[i]);
    }
};

var btnRemoveMarkers = document.getElementById('btnRemoveMarkers');
btnRemoveMarkers.onclick = function (event) {
    markerClusterer.removeMarkers(newMarkers);
    for (i = 0; i < MAX; i++) {
        map2.removeOverlay(newMarkers2[i]);
    }
};
/**
 * 得到一个随机的marker数组。
 * @param  {Number} 数组的长度
 * @return {Array} 随机marker数组
 */
function getNewMarkers(MAX){
    var newMarkers = [];
    for (i = 0; i < MAX; i++) {
        pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
        newMarkers.push(new BMap.Marker(pt));
    }
    return newMarkers;
}
