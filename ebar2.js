//https://ecomfe.github.io/echarts-examples/public/editor.html?c=bar1 <-- Source file from echarts
define(["./echarts-en", "qlik"],function(echarts, qlik){
  var app = qlik.currApp();
  console.log(qlik);
  return{
    definition: {
      component: "accordion",
      type: "items",
      items: {
        dimensions: {
          uses: "dimensions",
          min: 1,
          max: 2,
        },
        measures: {
          uses: "measures",
          min: 2,
          max: 2
        },
        settings: {
          uses: "settings"
        },
        layout: {
          label: 'Layout',
          component: "expandable-items",
          items: {
            colorPicking:{
              label: "Color Picker",
              items: {
                colorMeasure1: {
                  ref: "meas1.Colour",
                  label: "Colour Measure 1",
                  component: "color-picker",
                  dualOutput: true,
                  type: "object",
                  defaultValue: {
                    color: "#CCCCCC",
                    index: -1
                  }
                },
                colorMeasure2: {
                  ref: "meas2.Colour",
                  label: "Colour Measure 2",
                  component: "color-picker",
                  dualOutput: true,
                  type: "object",
                  defaultValue: {
                    color: "#CCCCCC",
                    index: -1
                  }
                }
              }
            },
            toolbox: {
              label: "Toolbox",
              items: {
                toolboxHandle: {
                  type: 'string',
                  component: 'dropdown',
                  label: 'Toolbox Visable/Hidden',
                  ref: 'toolboxHandle',
                  deafault: true,
                  options: [{
                    value: true,
                    label: 'Visable'
                  },{
                    value: false,
                    label: 'Hidden'
                  }]
                },
                lineChart: {
                  type: "boolean",
                  label: "Line Chart",
                  ref: "toolboxLine",
                  defaultValue: false
                },
                barChart: {
                  type: "boolean",
                  label: "Bar chart",
                  ref: "toolboxBar",
                  defaultValue: false
                },
                stacked: {
                  type: "boolean",
                  label: "Stacked charts",
                  ref: "toolboxStacked",
                  defaultValue: false
                },
                toolboxRestore: {
                  type: 'string',
                  component: 'dropdown',
                  label: 'Toolbox Restore on/off',
                  ref: 'toolboxRestore',
                  options: [{
                    value: true,
                    label: 'On'
                  },{
                    value: false,
                    label: 'Off'
                  }]
                },
                toolboxDataview: {
                  type: 'string',
                  component: 'dropdown',
                  label: 'Toolbox show Data on/off',
                  ref: 'toolboxDataview',
                  options: [{
                    value: true,
                    label: 'On'
                  },{
                    value: false,
                    label: 'Off'
                  }]
                },
              }
            },
            marktetOptions:{
              label: "Marktpoint Options",
              component: 'expandable-items',
              items: {
                marktLine: {
                  type: 'string',
                  component: 'dropdown',
                  label: 'Show Markt Line on/off',
                  ref: 'showMarktLine',
                  default: true,
                  options: [{
                    value: true,
                    label: 'On'
                  },{
                    value: false,
                    label: 'Off'
                  }]
                },
                marktPoint: {
                  label: 'Marktpoint',
                  items: {
                      marktLine: {
                        type: 'string',
                        component: 'dropdown',
                        label: 'Show Markt Pointer on/off',
                        ref: 'showMarktPointer',
                        default: true,
                        options: [{
                          value: true,
                          label: 'On'
                        },{
                          value: false,
                          label: 'Off'
                        }]
                      },
                      marktpointShape: {
                        type: 'string',
                        component: 'dropdown',
                        label: 'Marktpoint Shape',
                        ref: 'marktPointShape',
                        options: [{
                          value: 'circle',
                          label: 'Circle'
                        },{
                          value: 'pin',
                          label: 'Pin'
                        },{
                          value: 'arrow',
                          label: 'Arrow'
                        },{
                          value: 'roundRect',
                          label: 'Rounded Rectangle'
                        },{
                          value: 'triangle',
                          label: 'Triangle'
                        },{
                          value: 'rect',
                          label: 'Rectangle'
                        },{
                          value: 'diamond',
                          label: 'Diamond'
                        },]
                      },
                      marktPointSize: {
                        type: 'string',
                        label: 'Marktpoint Size(#)',
                        ref: 'marktPointSize',
                        default: '50'
                      },
                      marktPointOffSetHeight: {
                        type: 'string',
                        label: 'Marktpoint ofset height(#)',
                        ref: 'marktPointOffSetHeight',
                        default: '0'
                      },
                      marktPointOffSetCenter: {
                        type: 'string',
                        label: 'Marktpoint ofset center(#)',
                        ref: 'marktPointOffSetCenter',
                        default: '0'
                      }
                    }
                  }
                }
            },

          },
        }
      }
    },
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
        //console.log(cData);
      })
            if (layout.toolboxLine == true) {
              var lineAct = 'line'
            } else {
              var lineAct = ''
            };
            if (layout.toolboxBar == true) {
              var barAct = 'bar'
            } else {
              var barAct = ''
            };
            if (layout.toolboxStacked == true) {
              var stackAct = 'stack'
            } else {
              var stackAct = ''
            };


            console.log('BLA!');
            console.log(showMarktline);

            if (layout.showMarktLine == true) {
              var showMarktline = "markLine:{Data:[{type : 'average'}]}";
            } else {
              var showMarktline = '';
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
                        color: layout.meas1.Colour.color
                      }
                    },
                    markPoint : {
                      symbol: layout.marktPointShape,
                      symbolSize: layout.marktPointSize,
                      symbolOffset: [layout.marktPointOffSetCenter, layout.marktPointOffSetHeight],
                      data : [
                          {type : 'max', name: 'Lowest'},
                          {type : 'min', name: 'Highest'}
                      ]
                    },
                    // markLine : {
                    //   data : [
                    //       {type : 'average'}
                    //   ]
                    // }
                },
                {
                    name: layout.qHyperCube.qMeasureInfo[1].qFallbackTitle,
                    type:'bar',
                    data: cData,
                    itemStyle: {
                      normal: {
                        color: layout.meas2.Colour.color
                      }
                    },
                    markPoint : {
                      symbol: layout.marktPointShape,
                      symbolSize: layout.marktPointSize,
                      symbolOffset: [layout.marktPointOffSetCenter, layout.marktPointOffSetHeight],
                      data : [
                        {type : 'max', name: 'Lowest'},
                        {type : 'min', name: 'Highest'}
                      ]
                    },
                    markLine : {
                      data : [
                          {type : 'average'}
                      ]
                    }
                },
            ]
        };

      this.$scope.eChart.setOption(options);
    }
  }
});
