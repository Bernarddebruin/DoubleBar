var definition = definition: {
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
},;

console.log(definition);
