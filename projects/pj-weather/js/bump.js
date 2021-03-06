
// /* button polaroid*/

//   $('#section9 .btn-group-substances button[data="amphetamines"]').button('toggle')
//   var buttons = d3.select('#section9').select('.btn-group-substances').selectAll('.btn')

//   buttons.on('click', function(d){
//     $('#section9 .btn-group-substances button.active').button('toggle')
//     $(this).button('toggle')
//     var substance = d3.select(this).attr('data');
//     var type = d3.select(this).attr('dtype');
//     d3.select('#bump svg').remove()
//     d3.select("#bumpList").selectAll('.bumpList').remove()
//     makeBump(substance,type)
//     })

// var makeBump = function(substance,type){
//   var shadesDict = {
//     stimulants : ['#FFCED0','#FF0815'],
//     sedatives : ['#AAF9F8', '#2AEFEE'],
//     supplements : ['#BCF2E1', '#1FD59C'],
//     hallucinogenics : ['#DFD7E8', '#9578B3']
//   }

//   d3.tsv('data/polaroid/'+substance+'.tsv', function(data){

//           var width = d3.select('#bump').style('width').replace('px','')-30,
//               height = 400;

//           var dates = d3.set(data.map(function (d){ return d.year; })).values();

//           var groups = d3.nest()
//               .key(function(g){return g.target})
//               .rollup(function (g){

//                   var singles = d3.nest()
//                       .key(function(d){ return d.year; })
//                       .rollup(function (d){
//                           return {
//                               group : d[0].target,
//                               x : d[0].year,
//                               y : d.length
//                           }
//                       })
//                       .map(g);

//                   // let's create the empty ones
//                   dates.forEach(function(d){
//                       if (!singles.hasOwnProperty(d)) {
//                           singles[d] = { group : g[0].target, x : d, y : 0 }
//                       }
//                   })

//                   return d3.values(singles);
//               })
//               .map(data)

//           delete groups.undefined;

//           var layers = d3.values(groups).map(function(d){ return d.sort(function(a,b){ return a.x - b.x; }) });

//           var list = d3.nest()
//                       .key(function(d){return d.target})
//                       .rollup(function (d){
//                           return d.length
//                       })
//                       .entries(data)

//           list.sort(function(a,b){return d3.descending(a.values,b.values)})

//           list = list.filter(function(d){return d.key != 'undefined'})


//           var selection = d3.select("#bump").append('svg')

//           var g = selection
//               .attr("width", width + 30 )
//               .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
//               .attr("height", height)
//               .append("g")
//               .attr("width", width )
//               .attr("width", height )
//               .attr("transform", "translate(15,0)")


//           var curves = {
//             'Basis spline' : 'basis',
//             'Sankey' : interpolate,
//             'Linear' : 'linear'
//           }

//           layers[0].forEach(function(d,i){

//               var values = layers.map(function(layer){
//                   return layer[i];
//               })
//               .sort(function(a,b){
//                 return a.y-b.y
//               });

//               var sum = d3.sum(values, function(layer){ return layer.y; });
//               var y0 = 0;
//               values.forEach(function(layer){
//                 layer.y *= true ? 100 / sum : 1;
//                 layer.y0 = y0;
//                 y0 += layer.y + 1;
//               })

//           })


//           var x = date() && date.type() == "Date"
//               // Date
//               ? d3.time.scale()
//                   .domain( [ d3.min(layers, function(layer) { return d3.min(layer, function(d) { return d.x; }); }), d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.x; }); }) ])
//                   .range([0, +width()])
//               : date && date.type() == "String"
//                 // String
//                 ? d3.scale.ordinal()
//                     .domain(layers[0].map(function(d){ return d.x; }) )
//                     .rangePoints([0, +width()],0)
//                 // Number
//                 : d3.scale.linear()
//                     .domain( [ d3.min(layers, function(layer) { return d3.min(layer, function(d) { return d.x; }); }), d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.x; }); }) ])
//                     .range([0, +width()]);

//           var x = d3.time.scale()
//               .domain( [ d3.min(layers, function(layer) { return d3.min(layer, function(d) { return d.x; }); }), d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.x; }); }) ])
//               .range([0, width])


//           var x= d3.scale.ordinal()
//                         .domain(layers[0].map(function(d){ return d.x; }) )
//                         .rangePoints([0, width],0)

//           var y = d3.scale.linear()
//               .domain([0, d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
//               .range([height-20, 0]);

//           // to be improved
//           layers[0].forEach(function(d,i){

//               var values = layers.map(function(layer){
//                   return layer[i];
//               })
//               .sort(function(a,b){
//                 return a.y-b.y
//               });

//               var sum = d3.sum(values, function(layer){ return layer.y; });
//               var y0 = true ? 0 : -sum/2 + y.invert( (width-20)/2 ) - 1*(values.length-1)/2;

//               values.forEach(function(layer){
//                   layer.y *= true ? 100 / sum : 1;
//                   layer.y0 = y0;
//                   y0 += layer.y + 1;
//               })

//           })

//           var extent = d3.extent(layers, function(layer) { return d3.sum(layer, function(d) { return d.y; }); })
//           var extentList = d3.extent(list, function(l) { return l.values})

//           var colorScale = d3.scale.log().domain(extent).range(shadesDict[type])

//           var colorScaleList = d3.scale.log().domain(extentList).range(shadesDict[type])



//           d3.select("#bumpList").selectAll('.bumpList')
//             .data(list)
//             .enter()
//             .append('p')
//             .attr('class', function(d){ //taking data from csv into class name
//               return 'bumpList ' + d.key.replace(/\./g,'').replace(/\//g,'').replace(/ /g,'')
//             })
//             .text(function(d){
//               return d.key + ' ' + d.values
//             })
//             .style('color', function(d){
//               return colorScaleList(d.values)
//             })
//             .style('cursor', 'default')
//             .on('mouseover', function(d){
//               g.selectAll('path.layer')
//                 .transition()
//                 .style('fill-opacity', function(e){
//                   if(d.key == e[0].group){ //checking is selected item
//                     return 0.9
//                   }else{
//                     return 0.1
//                   }
//                 })

//               d3.select('#bumpList').selectAll('.bumpList') //bumplist opacity
//                 .transition()
//                 .style('opacity', function(e){
//                   if(d.key == e.key){
//                     return 1
//                   }else{
//                     return 0.2
//                   }
//                 })
//             })
//             .on('mouseout', function(d){
//               g.selectAll('path.layer')
//                 .transition()
//                 .style('fill-opacity',0.9)

//               d3.select('#bumpList').selectAll('.bumpList')
//                 .transition()
//                 .style('opacity', 1)
//             })

//           var xAxis = d3.svg.axis().scale(x).tickSize(-width+20).orient("bottom");


//           g.append("g")
//               .attr("class", "x axis")
//               .style("stroke-width", "1px")
//               .style("font-size","12px")
//               .style("font-family","Titillum Web")
//               .attr("transform", "translate(" + 0 + "," + (height-20) + ")")
//               .style("display",function(){ return true ? 'block' : 'none'; })
//               .call(xAxis)
//               // .on("mouseover", (ev, d) => mouseOver(d))
//               ;

//             // section via https://observablehq.com/@washpostgraphics/bump-chart-of-state-population-ranks
//           // const links = g.append("g")
//           //     .attr("class", "links")
//           //   .selectAll(".link-wrapper")
//           //     .data(linkData)
//           //   .enter().append("g")
//           //     .attr("class", d => `link-wrapper link-${d.state_abbr}`)
//           //     .on("mouseover", (ev, d) => mouseOver(d))
          
//           // links.append("path")
//           //     .attr("class", "link-bg")
//           //     .style("stroke-width", d => useWidthScale ? strokeWidthScale(d[1].pop) + 2 : 8)
//           //     .attr("d", line);
          
//           // links.append("path")
//           //     .style("stroke", linkStroke)
//           //     .style("fill", "none")
//           //     .attr("class", "link")
//           //     .style("stroke-width", d => useWidthScale ? strokeWidthScale(d[1].pop) : 4)
//           //     .attr("d", line);
  
//           // svg.on("mouseout", mouseOut);
  
//         // return svg.node();

//         // mouseOver =  => {
//         //   d3.selectAll(".link")
//         //       .style("stroke", linkDefault)
//         //       .style("opacity", fadeOpacity);
        
//         //   d3.selectAll(".node")
//         //       .style("fill", nodeDefault)
//         //       .style("opacity", fadeOpacity);

//         // }


//           // see above

//           d3.selectAll(".x.axis line, .x.axis path")
//               .style("shape-rendering","crispEdges")
//               .style("fill","none")
//               .style("stroke","#ccc")

//           colors.domain(layers, function (d){ return d[0].group; })

//           var area = d3.svg.area()
//               .interpolate(curves['Sankey'])
//               .x(function(d) { return x(d.x); })
//               .y0(function(d) { return y(d.y0); })
//               .y1(function(d) { return Math.min(y(d.y0)-1, y(d.y0 + d.y)); });

//           var line = d3.svg.line()
//               .interpolate(curves['Sankey'])
//               .x(function(d) { return x(d.x); })
//               .y(function(d) {
//                   var y0 = y(d.y0), y1 = y(d.y0 + d.y);
//                   return y0 + (y1 - y0) * 0.5;
//               });

//           g.selectAll("path.layer")
//               .data(layers)
//               .enter().append("path")
//                   .attr("class",function(d){
//                     return "layer " + d[0].group.replace(/\./g,'').replace(/\//g,'').replace(/ /g,'')
//                   })
//                   .attr("d", area)
//                   .attr("title", function (d){ return d[0].group; })
//                   .style("fill-opacity",.9)
//                   .style("fill", function(d){
//                     return colorScale(d3.sum(d, function(e){return e.y}))
//                   })
//                   .on('mouseover', function(d){
//                     g.selectAll('path.layer')
//                       .transition()
//                       .style('fill-opacity', function(e){
//                         if(d[0].group == e[0].group){
//                           return 0.9
//                         }else{
//                           return 0.1
//                         }
//                       })

//                       $('#bumpList').stop();
//                       $('#bumpList').animate({
//                            scrollTop: $("#bumpList ." +d[0].group.replace(/\./g,'').replace(/\//g,'').replace(/ /g,'')).offset().top- $("#bumpList").offset().top + $("#bumpList").scrollTop()
//                        }, 500);

//                     d3.select('#bumpList').selectAll('.bumpList')
//                       .transition()
//                       .style('opacity', function(e){
//                         if(d[0].group == e.key){
//                           return 1
//                         }else{
//                           return 0.2
//                         }
//                       })
//                   })
//                   .on('mouseout', function(d){
//                     g.selectAll('path.layer')
//                       .transition()
//                       .style('fill-opacity',0.9)

//                     d3.select('#bumpList').selectAll('.bumpList')
//                       .transition()
//                       .style('opacity', 1)
//                   })

//           if (true) return;

//           g.append('defs');

//           g.select('defs')
//               .selectAll('path')
//               .data(layers)
//               .enter().append('path')
//               .attr('id', function(d,i) { return 'path-' + i; })
//               .attr('d', line);

//           g.selectAll("text.label")
//               .data(layers)
//               .enter().append('text')
//               .attr('dy', '0.5ex')
//               .attr("class","label")
//              .append('textPath')
//               .attr('xlink:xlink:href', function(d,i) { return '#path-' + i; })
//               .attr('startOffset', function(d) {
//                   var maxYr = 0, maxV = 0;
//                   d3.range(layers[0].length).forEach(function(i) {
//                       if (d[i].y > maxV) {
//                           maxV = d[i].y;
//                           maxYr = i;
//                       }
//                   });
//                   d.maxVal = d[maxYr].y;
//                   d.offset = Math.round(x(d[maxYr].x) / x.range()[1] * 100);
//                   return Math.min(95, Math.max(5, d.offset))+'%';
//               })
//               .attr('text-anchor', function(d) {
//                   return d.offset > 90 ? 'end' : d.offset < 10 ? 'start' : 'middle';
//               })
//               .text(function(d){ return d[0].group; })
//               .style("font-size","11px")
//               .style("font-family","Titillum Web")
//               .style("font-weight","normal")

//           function sortBy(a,b){
//               if (sort() == 'value (descending)') return a.y - b.y;
//               if (sort() == 'value (ascending)') return b.y - a.y;
//               if (sort() == 'group') return a.group - b.group;
//           }

//           function interpolate(points) {
//             var x0 = points[0][0], y0 = points[0][1], x1, y1, x2,
//                 path = [x0, ",", y0],
//                 i = 0,
//                 n = points.length;

//             while (++i < n) {
//               x1 = points[i][0], y1 = points[i][1], x2 = (x0 + x1) / 2;
//               path.push("C", x2, ",", y0, " ", x2, ",", y1, " ", x1, ",", y1);
//               x0 = x1, y0 = y1;
//             }
//             return path.join("");
//           }
//   })
// }

// makeBump('amphetamines', 'stimulants');




// class =  bar
// class = layer cls-30
// class = bumpList cls-30



        
// {/* <p class="red button">Test</p>
// <p class="blue button">Test</p>
// <p class="red"> Not a button </p> */}

// CSS

// .red {
//   background: red;
// }

// .blue {
//   background: blue;    
// }

// .button {
//   border-radius: 6px;
// }

// .button:hover .red:hover {
//   background: pink;
// }

// .red.button:hover {
//   background: pink;
// }

// const series = svg.selectAll(".series")
//     .data(chartData)
//     .join("g")
//     .attr("class", "series")
//     .attr("opacity", 1)
//     .attr("fill", d => color(d[0].rank))
//     .attr("stroke", d => color(d[0].rank))
//     .attr("transform", `translate(${margin.left + padding},0)`)
//     .on("mouseover", highlight)
//     .on("mouseout", restore);
// const picks = svg.selectAll('.layer')
//   picks.selectAll("path")
//     .on("mouseover", highlight)
//     .on("mouseout", restore);

//     .data(d => d)
//     .join("path")
//     .attr("stroke-width", strokeWidth(drawingStyle))
//     .attr("d", (d, i) => { 
//       if (d.next) 
//         return d3.line()([[bx(i), by(d.rank)], [bx(i + 1), by(d.next.rank)]]);
//     });
  