import * as d3 from "d3";
import {JSDOM} from "jsdom";
import {select} from "d3";

const jsdom = new JSDOM(html);
const svg = select(jsdom.window.document.body).append("svg");