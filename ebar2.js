//https://ecomfe.github.io/echarts-examples/public/editor.html?c=bar1 <-- Source file from echarts
define(["./echarts-en", "qlik", "./definition"],function(echarts, qlik, definition){
  var app = qlik.currApp();
  console.log(qlik);
  return{
    definition: definition,
    initialProperties: {
      qHyperCubeDef: {
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 3,
            qHeight: 3333
          }
        ]
      }
    },
    controller: function($scope, $element){
      $scope.eChart = echarts.init($element[0]);
      $scope.selectedElemNums;
      $scope.chartColours = [];
      $scope.eChart.on("click", function(c){
        $scope.selectValues(0,[c.data.elemNumber])  //Make the selection in Qlik
        if (c.selected) {
          c.data.itemStyle.normal.color = ""   //Change the colour back to the default
        }
        else {
          c.data.itemStyle.normal.color = "#FFAA00"   //Update the colour of the current bar
        }
        c.data.selected = !c.data.selected;
        $scope.eChart.setOption({});  // Force the chart to update itself
      })
    },
    resize: function(){
      this.$scope.eChart.resize();
    },
    paint: function($element, layout){
      var that = this;
      var xData = [];
      var yData = [];
      var cData = [];
      var matrix = layout.qHyperCube.qDataPages[0].qMatrix;
      console.log (matrix)
      console.log(layout);
      matrix.forEach(function(row){
        xData.push({
          value: row[0].qText
        });
        yData.push({
          elemNumber: row[0].qElemNumber,
          psuedoSelected: false,  //We'll use this to toggle the colours
          dimensionLabel: row[0].qText,  // Store the label text for the tooltip
          value: row[1].qNum, //The raw num will be used for the bar size
          parsedValue: row[1].qText, //The friendly value can be used in the popup
          measureLabel: layout.qHyperCube.qMeasureInfo[0].qFallbackTitle,
          extraInfo: ((row[2])?row[2].qText:''),  //This demonstrates that we can add extra info using additional measures
          itemStyle: {  //This sets up the default colours for the bars
            normal: {

            }
          }
        });

        cData.push({
          elemNumber: row[0].qElemNumber,
          psuedoSelected: false,  //We'll use this to toggle the colours
          dimensionLabel: row[0].qText,  // Store the label text for the tooltip
          value: row[2].qNum, //The raw num will be used for the bar size
          parsedValue: row[1].qText, //The friendly value can be used in the popup
          measureLabel: layout.qHyperCube.qMeasureInfo[0].qFallbackTitle,
          extraInfo: ((row[2])?row[2].qText:''),  //This demonstrates that we can add extra info using additional measures
          itemStyle: {  //This sets up the default colours for the bars
            normal: {

            }
          }
        });
      })
            if (layout.toolboxLine == true) {
              var lineAct = 'line'
            } else {
              var lineAct
            };
            if (layout.toolboxBar == true) {
              var barAct = 'bar'
            } else {
              var barAct
            };
            if (layout.toolboxStacked == true) {
              var stackAct = 'stack'
            } else {
              var stackAct
            };


            var options = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[layout.qHyperCube.qMeasureInfo[1].qFallbackTitle, layout.qHyperCube.qMeasureInfo[0].qFallbackTitle],
                inactiveColor: '#ccc'
            },
            toolbox: {
                show : layout.toolboxHandle,
                feature : {
                    dataView : {show: layout.toolboxDataview, readOnly: false},
                    magicType : {show: layout.toolboxHandle, type: [lineAct, stackAct, barAct]},
                    restore : {show: layout.toolboxRestore},
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : xData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:layout.qHyperCube.qMeasureInfo[0].qFallbackTitle,
                    type:'bar',
                    data: yData,
                    itemStyle: {
                      normal: {
                        color: layout.qHyperCube.qMeasureInfo[0].Colour.color
                      }
                    },
                    markPoint : (layout.qHyperCube.qMeasureInfo[0].showMarktLine===false?{}:{
                      symbol: layout.qHyperCube.qMeasureInfo[0].marktPointShape,
                      symbolSize: layout.qHyperCube.qMeasureInfo[0].marktPointSize,
                      symbolOffset: [layout.qHyperCube.qMeasureInfo[0].marktPointOffSetCenter, layout.qHyperCube.qMeasureInfo[0].marktPointOffSetHeight],
                      data: [
                        {type : 'min', name: 'Lowest'},
                        {type : 'max', name: 'Highest'}
                      ]
                    }),
                    markLine : {
                      data : [
                          {name: 'average', type : 'average'}
                      ]
                    }
                },
                {
                    name: layout.qHyperCube.qMeasureInfo[1].qFallbackTitle,
                    type:'bar',
                    data: cData,
                    itemStyle: {
                      normal: {
                        color: layout.qHyperCube.qMeasureInfo[1].Colour.color
                      }
                    },
                    markPoint : (layout.qHyperCube.qMeasureInfo[1].showMarktLine===false?{}:{
                      symbol: layout.qHyperCube.qMeasureInfo[1].marktPointShape,
                      symbolSize: layout.qHyperCube.qMeasureInfo[1].marktPointSize,
                      symbolOffset: [layout.qHyperCube.qMeasureInfo[1].marktPointOffSetCenter, layout.qHyperCube.qMeasureInfo[0].marktPointOffSetHeight],
                      data : [
                        {type : 'min', name: 'Lowest'},
                        {type : 'max', name: 'Highest'}
                      ]
                    }),
                    markLine : {
                      data : [
                          {name: 'average', type : 'average'}
                      ]
                    }
                },
            ]
        };
      this.$scope.eChart.setOption(options);
    }
  }
});
