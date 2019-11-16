const xMax = 40;
const xMin = 0;
const yMax = 50
const yMin = 0;

const padding = 100;
const graphWidth = 1000;
const w = padding + graphWidth + padding;
const h = padding + graphWidth*1.25 + padding;


let svg = d3.select("#Graph")
    // .append("svg")
    .attr("width", w)
    .attr("height", h);

//グラフの描画
//スケールの設定
const xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([padding, w - padding]);
const yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([h - padding, padding]);
//データの読み込みと描画

d3.csv("ZB4.rgb",
    function (d, i) {
        return {
            x: Number(d.x),
            y: Number(d.y),
            zb: Number(d.zb),
            color: d.color
        };
    }).then(function (dataset) {
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return xScale(d.x);
            })
            .attr("y", function (d) {
                return yScale(d.y + 1);
            })
            .attr("width", function (d) {
                return xScale(d.x + 1) - xScale(d.x);
            })
            .attr("height", function (d) {
                return yScale(d.y) - yScale(d.y + 1);
            })
            .attr("fill", function (d) {
                return d.color;
            });
        //zbの表示
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d.zb;
            })
            .attr("x", function (d) {
                return xScale(d.x + 0.1);
            })
            .attr("y", function (d) {
                return yScale(d.y + 0.3);
            })
            .attr("font-size", "8px")
            .attr("fill", "black");



        //軸の設定
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5);
        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(5);
        //軸の描画
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis)
            .call(
                d3.axisBottom(xScale)
                    .ticks(20)
                    .tickSize(-h)
            );
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis)
            .call(
                d3.axisLeft(yScale)
                    .ticks(25)
                    .tickSize(-w)
            );
        //軸ラベルの描画
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 + 10)
            .attr("x", 0 - (h / 2))
            .attr("dy", "1em")
            .attr("font-size", "24px")
            .text("Y");

        svg.append("text")
            .attr("class", "xtext")
            .attr("x", w / 2)
            .attr("y", h - 30)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .text("X");

        //タイトルの描画
        svg.append("text")
            .attr("id", "title")
            .text("Elevation")
            .attr("border","1px solid blue")
            .attr("x", w/2)
            .attr("y", 50)
            .attr("width","500px")
            .attr("font-size", "2em")
            .attr("text-anchor","middle");

    });


//前回のコードに下記の処理を追加

//データ更新ボタンをクリックしたとき(1 IP)
d3.select("#IPGraph")
	/*
		on()メソッド
		第１引数：イベント名を文字列で指定
				　クリックの場合は"click"
		第２引数：イベントが発生したときに
				　呼ばれる関数を指定する。
	*/
    .on("click", function () {

        d3.csv("IP2xy.xyz",
            function (d, i) {
                return {
                    x: Number(d.x),
                    y: Number(d.y),
                    IP: d.IP,
                    color: d.color
                };
            }).then(function (dataset) {
                svg.selectAll("rect")
                    .data(dataset)
                    .attr("x", function (d) {
                        return xScale(d.x);
                    })
                    .attr("y", function (d) {
                        return yScale(d.y + 1);
                    })
                    .attr("width", function (d) {
                        return xScale(d.x + 1) - xScale(d.x);
                    })
                    .attr("height", function (d) {
                        return yScale(d.y) - yScale(d.y + 1);
                    })
                    .attr("fill", function (d) {
                        return d.color;
                    });
                //IP文字の表示
                svg.selectAll("text")
                    .data(dataset)
                    .text(function (d) {
                        return d.IP;
                    })
                    .attr("x", function (d) {
                        return xScale(d.x + 0.4);
                    })
                    .attr("y", function (d) {
                        return yScale(d.y + 0.4);
                    })
                    .attr("font-size", "8px")
                    .attr("fill", "black");

                //タイトルの描画
                svg.select("#title")
                    .text("IP");

            });


    });


//データ更新ボタンをクリックしたとき(2 ZB)
d3.select("#ZBGraph")
	/*
		on()メソッド
		第１引数：イベント名を文字列で指定
				　クリックの場合は"click"
		第２引数：イベントが発生したときに
				　呼ばれる関数を指定する。
	*/
    .on("click", function () {

        d3.csv("ZB4.rgb",
            function (d, i) {
                return {
                    x: Number(d.x),
                    y: Number(d.y),
                    zb: Number(d.zb),
                    color: d.color
                };
            }).then(function (dataset) {
                svg.selectAll("rect")
                    .data(dataset)
                    // .enter()
                    // .append("rect")
                    .attr("x", function (d) {
                        return xScale(d.x);
                    })
                    .attr("y", function (d) {
                        return yScale(d.y + 1);
                    })
                    .attr("width", function (d) {
                        return xScale(d.x + 1) - xScale(d.x);
                    })
                    .attr("height", function (d) {
                        return yScale(d.y) - yScale(d.y + 1);
                    })
                    .attr("fill", function (d) {
                        return d.color;
                    });
                //zbの表示
                svg.selectAll("text")
                    .data(dataset)
                    // .enter()
                    // .append("text")
                    .text(function (d) {
                        return d.zb;
                    })
                    .attr("x", function (d) {
                        return xScale(d.x + 0.1);
                    })
                    .attr("y", function (d) {
                        return yScale(d.y + 0.3);
                    })
                    .attr("font-size", "8px")
                    .attr("fill", "black");

                //タイトルの描画
                svg.select("#title")
                    .text("Elevation");
            });


    });


//データ更新ボタンをクリックしたとき(3 MR)
d3.select("#MRGraph")
	/*
		on()メソッド
		第１引数：イベント名を文字列で指定
				　クリックの場合は"click"
		第２引数：イベントが発生したときに
				　呼ばれる関数を指定する。
	*/
    .on("click", function () {

        d3.csv("MR.xyz",
            function (d, i) {
                return {
                    x: Number(d.x),
                    y: Number(d.y),
                    MR: Number(d.MR),
                    color: d.color
                };
            }).then(function (dataset) {
                svg.selectAll("rect")
                    .data(dataset)
                    // .enter()
                    // .append("rect")
                    .attr("x", function (d) {
                        // console.log(d.x);
                        // console.log(xScale(d.x));
                        return xScale(d.x);
                    })
                    .attr("y", function (d) {
                        // console.log(d.y+1);
                        // console.log(yScale(d.y));
                        return yScale(d.y + 1);
                    })
                    .attr("width", function (d) {
                        return xScale(d.x + 1) - xScale(d.x);
                    })
                    .attr("height", function (d) {
                        return yScale(d.y) - yScale(d.y + 1);
                    })
                    .attr("fill", function (d) {
                        return d.color;
                    });
                //MR文字の表示
                svg.selectAll("text")
                    .data(dataset)
                    // .enter()
                    // .append("text")
                    .text(function (d) {
                        return d.MR;
                    })
                    .attr("x", function (d) {
                        return xScale(d.x + 0.4);
                    })
                    .attr("y", function (d) {
                        return yScale(d.y + 0.4);
                    })
                    .attr("font-size", "8px")
                    .attr("fill", "black");

                //タイトルの描画
                svg.select("#title")
                    .text("Manning Roughness");
            });
    });