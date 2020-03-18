# plot-utils

## update
forked from [zhoulytwinyu/plot-utils](https://github.com/zhoulytwinyu/plot-utils). updated for daylight saving days hours display.


for `EDT` timezone,

before:

---8:00---20:00---8:00---20:00---

after:

---7:00---19:00---7:00---19:00---


# origin readme
This library is designed to plots easy. It isolate some of the core functions of plotting, such as coordinate transformation, grid generation etc.
Fair warning, it is my personal attempt for my personal convinience. It is not likely to stabilize. I myself is learning as I go.

## Available functions
```
// Coordinate utils
getRotatedAxisCoordinate(x,y,rotation)
/*
 * Suppose rotating a plot around upper-left origin.
 * Where does the point (x,y) on old coordinate system lie on the rotated plot?
 * Return {x,y}
/*
toDomXCoord_Linear(width,minX,maxX,dataX)
fromDomXCoord_Linear(width,minX,maxX,domX)
toDomYCoord_Linear(height,minY,maxY,dataY)
fromDomYCoord_Linear(height,minY,maxY,domY)

// Grid utils
generateGrids(minX,maxX,rangeMinX,rangeMaxX)
/*
 * Return { grids:[], validFromDiff, validToDiff}
 */
generateDateGrids(minX,maxX,rangeMinX,rangeMaxX)
```

## design guidelines
The beginning of this library is quite chaotic, not gonna lie here. A lot of functions moved in and out of this library. This is bad!
So, that is why I think it is helpful to set the guidelines here to help me and anyone else to reason about whether to include a function in this library:
1. Is the functionality to be reused a lot in all sorts of plots?
2. Is the functionality technology agnostic?
The answer for both question had better be "yes".

## Lesson learned/bad examples
I once included a `lineplot` function in this library:
```
function linePlot(ctx,domXs,domYs){
  ctx.beginPath();
  ctx.moveTo(domX[0],domY[0]);
  for (let i=1; i<domXs.length; i++) {
    ctx.lineTo(domXs[i],domYs[i]);
  }
  ctx.stroke();
}
```
I no longer see it a fit in this library because it violated our guideline 2. It is a function for HTML5 canvas and is not suitable for other visualization technologies, e.g. svg.
So maybe function like that can be moved in ,say , a canvas plotter library?
