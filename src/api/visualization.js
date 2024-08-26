import request from "../utils/request.js";

export const getVisualization = () => request({
    url:'/visualization'
})
