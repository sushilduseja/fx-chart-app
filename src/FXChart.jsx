import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DateTime } from 'luxon';
import fxService from './fxService';

DateTime.local().toFormat('yyyy LLL dd') // "2022 Jan 01"

const FXChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fxService.getFxData();
      drawChart(data);
    };
    fetchData();
  }, []);

  const drawChart = (data) => {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.timestamp)))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => Math.min(d.open, d.high, d.low, d.close)),
      d3.max(data, d => Math.max(d.open, d.high, d.low, d.close))])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg.append("g")
      .call(yAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("x", 6)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("text-anchor", "start")
      .text("Price ($)");

    const openLine = d3.line()
      .x(d => x(new Date(d.timestamp)))
      .y(d => y(d.open));

    const highLine = d3.line()
      .x(d => x(new Date(d.timestamp)))
      .y(d => y(d.high));

    const lowLine = d3.line()
      .x(d => x(new Date(d.timestamp)))
      .y(d => y(d.low));

    const closeLine = d3.line()
      .x(d => x(new Date(d.timestamp)))
      .y(d => y(d.close));

    svg.append("path")
      .datum(data.filter(d => !isNaN(d.open)))
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", openLine);

    svg.append("path")
      .datum(data.filter(d => !isNaN(d.high)))
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", highLine);

    svg.append("path")
      .datum(data.filter(d => !isNaN(d.low)))
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", lowLine);

    svg.append("path")
      .datum(data.filter(d => !isNaN(d.close)))
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 1.5)
      .attr("d", closeLine);
  };


  return <svg ref={svgRef} />;
};

export default FXChart;
