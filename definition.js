define([], function(){
  return {
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
        max: 2,
        items: {
          color: {
            ref: "qDef.Colour",
            label: "Colour",
            component: "color-picker",
            dualOutput: true,
            type: "object",
            defaultValue: {
              color: "#CCCCCC",
              index: -1
            }
          },
          marktLine: {
            type: 'boolean',
            component: 'switch',
            label: 'Show Markt Line on/off',
            ref: 'qDef.showMarktLine',
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
            ref: 'qDef.marktPointShape',
            show: function(d){
              return d.qDef.showMarktLine
            },
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
            type: 'number',
            label: 'Marktpoint Size(#)',
            ref: 'qDef.marktPointSize',
            default: 50,
            show: function(d){
              return d.qDef.showMarktLine
            }
          },
          marktPointOffSetHeight: {
            type: 'number',
            label: 'Marktpoint ofset height(#)',
            ref: 'qDef.marktPointOffSetHeight',
            default: 0,
            show: function(d){
              return d.qDef.showMarktLine
            }
          },
          marktPointOffSetCenter: {
            type: 'number',
            label: 'Marktpoint ofset center(#)',
            ref: 'qDef.marktPointOffSetCenter',
            default: 0,
            show: function(d){
              return d.qDef.showMarktLine
            }
          }
        }
      },
      settings: {
        uses: "settings"
      },
      layout: {
        label: 'Layout',
        component: "expandable-items",
        items: {
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
              }
            }
          }
        }
      }
    }
  }
})
