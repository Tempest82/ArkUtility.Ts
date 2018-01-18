/* Copyright 2018 Sean Jordan
(Licence Notice (LGPLv3))

This file is part of ArkUtility.Ts a TypeScript Project.

ArkUtility.Ts is free software: you can redistribute it and / or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

ArkUtility.Ts is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with ArkUtility.Ts. If not, see < http://www.gnu.org/licenses/ >.
*/

/* Typedefs have been modified to permit TypeScript 1.8 compiling due to local requirements not yet permitting TypeScript v2+. Upon upgrade re-download typedefs for chart.js and jquery */
/// <reference path="typedefs/reference.ts"/>
/** A selction of utilities which are fairly independant of any third party dependancies. All dependancies should be annotated.  */
namespace ArkUtility {
    /**
     *  Designed to support Chart.js functionality. Not yet fully tested though working in all known implmentations that have been worked so far.
     */
    namespace ChartJsSupport {
        /**  */
        export function createCanvasTag(tagId: string, width?: number, height?: number): string {
            let result = '';
            result = '<canvas id="' + tagId + '" width="' + width + '" height="' + height + '"></canvas>';
            return result;
        }

        /**  */
        export function getChartContext(tagId: string): CanvasRenderingContext2D {
            let result: CanvasRenderingContext2D;
            result = (document.getElementById(tagId) as HTMLCanvasElement).getContext("2d");
            return result;
        }

        /**  */
        export function createChart(ctx: string |
                                         JQuery |
                                         CanvasRenderingContext2D |
                                         HTMLCanvasElement |
                                         string[] |
                                         CanvasRenderingContext2D[] |
                                         HTMLCanvasElement[],
            options: Chart.ChartConfiguration) {
            let result = new Chart(ctx, options);
            return result;
        }

        /**  */
        export function createChartConfig(type: Chart.ChartType | string,
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let result: Chart.ChartConfiguration;
            result = {
                type: type,
                data: data,
                options: options
            };
            return result;
        }

        /**  */
        export function createBarChart(ctx: string |
                                            JQuery |
                                            CanvasRenderingContext2D |
                                            HTMLCanvasElement |
                                            string[] |
                                            CanvasRenderingContext2D[] |
                                            HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('bar', data, options);
            return createChart(ctx, config);
        }

        /**  */
        export function createLineChart(ctx: string |
                                             JQuery |
                                             CanvasRenderingContext2D |
                                             HTMLCanvasElement |
                                             string[] |
                                             CanvasRenderingContext2D[] |
                                             HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('line', data, options);
            return createChart(ctx, config);
        }

        /**  */
        export function createRadarChart(ctx: string |
                                              JQuery |
                                              CanvasRenderingContext2D |
                                              HTMLCanvasElement |
                                              string[] |
                                              CanvasRenderingContext2D[] |
                                              HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('radar', data, options);
            return createChart(ctx, config);
        }

        /**  */
        export function createPieChart(ctx: string |
                                            JQuery |
                                            CanvasRenderingContext2D |
                                            HTMLCanvasElement |
                                            string[] |
                                            CanvasRenderingContext2D[] |
                                            HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('pie', data, options);
            return createChart(ctx, config);
        }

        /**  */
        export function createDoughnutChart(ctx: string |
                                                 JQuery |
                                                 CanvasRenderingContext2D |
                                                 HTMLCanvasElement |
                                                 string[] |
                                                 CanvasRenderingContext2D[] |
                                                 HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('doughnut', data, options);
            return createChart(ctx, config);
        }

        /**  */
        export function createPolarAreaChart(ctx: string |
                                                  JQuery |
                                                  CanvasRenderingContext2D |
                                                  HTMLCanvasElement |
                                                  string[] |
                                                  CanvasRenderingContext2D[] |
                                                  HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('polarArea', data, options);
            return createChart(ctx, config);
        }

        /**  */
        export function createBubbleChart(ctx: string |
                                               JQuery |
                                               CanvasRenderingContext2D |
                                               HTMLCanvasElement |
                                               string[] |
                                               CanvasRenderingContext2D[] |
                                               HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('bubble', data, options);
            return createChart(ctx, config);
        }

        /**  */
        export function createScatterChart(ctx: string |
                                                JQuery |
                                                CanvasRenderingContext2D |
                                                HTMLCanvasElement |
                                                string[] |
                                                CanvasRenderingContext2D[] |
                                                HTMLCanvasElement[],
            data: Chart.ChartData,
            options: Chart.ChartOptions) {
            let config = createChartConfig('scatter', data, options);
            return createChart(ctx, config);
        }

        /**  */
        function createBasicChartOptions(): Chart.ChartOptions {
            let result: Chart.ChartOptions = {};
            return result;
        }

        /**  */
        function setChartOptionOnClick(chartOptions: Chart.ChartOptions, onClick: any) {
            if (typeof onClick != 'undefined' && onClick != null) {
                chartOptions.onClick = onClick;
            }
        }

        /**  */
        function setChartOptionResponsiveAnimationDuration(chartOptions: Chart.ChartOptions,
            responsiveAnimationDuration: number) {
            if (typeof responsiveAnimationDuration != 'undefined' && responsiveAnimationDuration != null) {
                chartOptions.responsiveAnimationDuration = responsiveAnimationDuration;
            }
        }

        /**  */
        function setChartOptionMaintainAspectRatio(chartOptions: Chart.ChartOptions, maintainAspectRatio: boolean) {
            if (typeof maintainAspectRatio != 'undefined' && maintainAspectRatio != null) {
                chartOptions.maintainAspectRatio = maintainAspectRatio;
            }
        }

        /**  */
        function setChartOptionEvents(chartOptions: Chart.ChartOptions, events: string[]) {
            if (typeof events != 'undefined' && events != null) {
                chartOptions.events = events;
            }
        }

        /**  */
        function setChartOptionTitle(chartOptions: Chart.ChartOptions, title: Chart.ChartTitleOptions) {
            if (typeof title != 'undefined' && title != null) {
                chartOptions.title = title;
            }
        }

        /**  */
        function setChartOptionLegend(chartOptions: Chart.ChartOptions, legend: Chart.ChartLegendOptions) {
            if (typeof legend != 'undefined' && legend != null) {
                chartOptions.legend = legend;
            }
        }

        /**  */
        function setChartOptionTooltips(chartOptions: Chart.ChartOptions, tooltips: Chart.ChartTooltipOptions) {
            if (typeof tooltips != 'undefined' && tooltips != null) {
                chartOptions.tooltips = tooltips;
            }
        }

        /**  */
        function setChartOptionHover(chartOptions: Chart.ChartOptions, hover: Chart.ChartHoverOptions) {
            if (typeof hover != 'undefined' && hover != null) {
                chartOptions.hover = hover;
            }
        }

        /** set ChartOption Animation */
        function setChartOptionAnimation(chartOptions: Chart.ChartOptions, animation: Chart.ChartAnimationOptions) {
            if (typeof animation != 'undefined' && animation != null) {
                chartOptions.animation = animation;
            }
        }

        /** set ChartOption Elements */
        function setChartOptionElements(chartOptions: Chart.ChartOptions, elements: Chart.ChartElementsOptions) {
            if (typeof elements != 'undefined' && elements != null) {
                chartOptions.elements = elements;
            }
        }

        /** set ChartOption Scales */
        function setChartOptionScales(chartOptions: Chart.ChartOptions, scales: Chart.ChartScales) {
            if (typeof scales != 'undefined' && scales != null) {
                chartOptions.scales = scales;
            }
        }

        /** set ChartOption CutoutPercentage */
        function setChartOptionCutoutPercentage(chartOptions: Chart.ChartOptions, cutoutPercentage: number) {
            if (typeof cutoutPercentage != 'undefined' && cutoutPercentage != null) {
                chartOptions.cutoutPercentage = cutoutPercentage;
            }
        }

        /** Set ChartOption Responsive  */
        function setChartOptionResponsive(chartOptions: Chart.ChartOptions, responsive: boolean) {
            if (typeof responsive != 'undefined' && responsive != null) {
                chartOptions.responsive = responsive;
            }
        }

        /**  */
        function createChartOptions(responsive?: boolean,
            responsiveAnimationDuration?: number,
            maintainAspectRatio?: boolean,
            events?: string[],
            onClick?: any,
            title?: Chart.ChartTitleOptions,
            legend?: Chart.ChartLegendOptions,
            tooltips?: Chart.ChartTooltipOptions,
            hover?: Chart.ChartHoverOptions,
            animation?: Chart.ChartAnimationOptions,
            elements?: Chart.ChartElementsOptions,
            scales?: Chart.ChartScales,
            cutoutPercentage?: number): Chart.ChartOptions {
            let result: Chart.ChartOptions = {};
            if (typeof responsive != 'undefined' && responsive != null) {
                result.responsive = responsive;
            }
            if (typeof responsiveAnimationDuration != 'undefined' && responsiveAnimationDuration != null) {
                result.responsiveAnimationDuration = responsiveAnimationDuration;
            }
            if (typeof maintainAspectRatio != 'undefined' && maintainAspectRatio != null) {
                result.maintainAspectRatio = maintainAspectRatio;
            }
            if (typeof events != 'undefined' && events != null) {
                result.events = events;
            }
            if (typeof onClick != 'undefined' && onClick != null) {
                result.onClick = onClick;
            }
            if (typeof title != 'undefined' && title != null) {
                result.title = title;
            }
            if (typeof legend != 'undefined' && legend != null) {
                result.legend = legend;
            }
            if (typeof tooltips != 'undefined' && tooltips != null) {
                result.tooltips = tooltips;
            }
            if (typeof hover != 'undefined' && hover != null) {
                result.hover = hover;
            }
            if (typeof animation != 'undefined' && animation != null) {
                result.animation = animation;
            }
            if (typeof elements != 'undefined' && elements != null) {
                result.elements = elements;
            }
            if (typeof scales != 'undefined' && scales != null) {
                result.scales = scales;
            }
            if (typeof cutoutPercentage != 'undefined' && cutoutPercentage != null) {
                result.cutoutPercentage = cutoutPercentage;
            }
            return result;
        }

        /**  */
        export class ChartLegendItem implements Chart.ChartLegendItem {
            /** Label that will be displayed */
            text: string;
            /** Fill style of the legend box */
            fillStyle: string;
            /** If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect */
            hidden: boolean;
            /** For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap */
            lineCap: string;
            /** For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash */
            lineDash: number[];
            /** For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset */
            lineDashOffset: number;
            /** For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin */
            lineJoin: string;
            /** Width of box border */
            lineWidth: number;
            /** Stroke style of the legend box */
            strokeStyle: string;
            /** Point style of the legend box (only used if usePointStyle is true) */
            pointStyle: string;

            constructor() {
            }
        }

        /**  */
        export class ChartTitleOptions implements Chart.ChartTitleOptions {
            /** Is the title shown    */
            display: boolean;
            /**  Top left bottom right*/
            position: string;
            //fullWdith: boolean;
            /** Font size. defaul 12*/
            fontSize: number;
            /** Font family for the title text. */
            fontFamily: string;
            /** Font color. Type: string | CanvasGradient | CanvasPattern | string[] */
            fontColor: Chart.ChartColor;
            /** Font style. i.e. 'bold'*/
            fontStyle: string;
            /** Number of pixels to add above and below the title text */
            padding: number;
            /** Title text to display*/
            text: string;

            constructor() {
                this.display = false;
                this.text = '';
                this.padding = 10;
                this.fontStyle = 'bold';
                this.fontColor = '#666';
                this.fontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                this.fontSize = 12;
                this.position = 'top';
            }
        }

        /**  */
        export class ChartLegendOptions implements Chart.ChartLegendOptions {
            /** Show Legend? */
            display: boolean;
            /**  Top left bottom right*/
            position: string;
            /** Marks that this box should take the full width of the canvas (pushing down other boxes).This is unlikely to need to be changed in day - to - day use. */
            fullWidth: boolean;
            /** A callback that is called when a click event is registered on a label item */
            onClick: (event: any, legendItem: any | Chart.ChartLegendItem) => void;
            /** A callback that is called when a 'mousemove' event is registered on top of a label item */
            onHover: (event: any, legendItem: any | Chart.ChartLegendItem) => void;
            /** Legend will show datasets in reverse order. */
            reverse: boolean;
            /** See the Legend Label Configuration section below. */
            labels: Chart.ChartLegendLabelOptions;

            constructor() {
                this.display = true;
                this.position = 'top';
                this.fullWidth = true;
                this.onClick = null;
                this.onHover = null;
                this.reverse = false;
                this.labels = null;
            }
        }

        /**  */
        export class ChartLegendLabelOptions implements Chart.ChartLegendLabelOptions {
            /** width of colored box */
            boxWidth: number;
            /** font size of text */
            fontSize: number;
            /** font style of text */
            fontStyle: string;
            /** Color of text */
            fontColor: Chart.ChartColor;
            /** Font family of legend text. */
            fontFamily: string;
            /** Padding between rows of colored boxes. */
            padding: number;
            /** Generates legend items for each thing in the legend.Default implementation returns the text + styling for the color box.See Legend Item for details. */
            generateLabels: (chart: any) => any;
            /** Filters legend items out of the legend.Receives 2 parameters, a Legend Item and the chart data. */
            filter: (legendItem: any, chart: any) => any;
            /** Label style will match corresponding point style (size is based on fontSize, boxWidth is not used in this case). */
            usePointStyle: boolean;

            constructor() {
                this.boxWidth = 40;
                this.fontSize = 12;
                this.fontStyle = 'normal';
                this.fontColor = '#666';
                this.fontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                this.padding = 10;
                this.filter = null;
                this.usePointStyle = false;
            }
        }

        /**  */
        export class ChartTooltipOptions implements Chart.ChartTooltipOptions {
            /** Are tooltips enabled */
            enabled: boolean;
            /** See custom tooltip section. */
            custom: (a: any) => void;
            /** Sets which elements appear in the tooltip.more.... */
            mode: string;
            /** if true, the tooltip mode applies only when the mouse position intersects with an element.If false, the mode will be applied at all times. */
            intersect: boolean;
            /** Background color of the tooltip. */
            backgroundColor: Chart.ChartColor;
            /** title font */
            titleFontFamily: string;
            /** Title font size */
            titleFontSize: number;
            /** Title font style */
            titleFontStyle: string;
            /**  Title font color */
            titleFontColor: Chart.ChartColor;
            /** Spacing to add to top and bottom of each title line. */
            titleSpacing: number;
            /**  Margin to add on bottom of title section. */
            titleMarginBottom: number;
            /** body line font */
            bodyFontFamily: string;
            /** Body font size */
            bodyFontSize: number;
            /** Body font style */
            bodyFontStyle: string;
            /** Body font color */
            bodyFontColor: Chart.ChartColor;
            /** Spacing to add to top and bottom of each tooltip item. */
            bodySpacing: number;
            /** footer font */
            footerFontFamily: string;
            /**  Footer font size */
            footerFontSize: number;
            /** Footer font style */
            footerFontStyle: string;
            /** Footer font color */
            footerFontColor: Chart.ChartColor;
            /** Spacing to add to top and bottom of each fotter line. */
            footerSpacing: number;
            /** Margin to add before drawing the footer. */
            footerMarginTop: number;
            /** Padding to add on left and right of tooltip. */
            xPadding: number;
            /** Padding to add on top and bottom of tooltip. */
            yPadding: number;
            /** Size, in px, of the tooltip arrow. */
            caretSize: number;
            /** Radius of tooltip corner curves. */
            cornerRadius: number;
            /** Color to draw behind the colored boxes when multiple items are in the tooltip */
            multiKeyBackground: string;
            /**  */
            callbacks: Chart.ChartTooltipCallback;
            /**  */
            filter: (item: Chart.ChartTooltipItem) => boolean;
            /**  */
            itemSort: (itemA: Chart.ChartTooltipItem, itemB: Chart.ChartTooltipItem) => number;
            /** The mode for positioning the tooltip.more...  */
            position: "average" | "nearest";
            /** Extra distance to move the end of the tooltip arrow away from the tooltip point. */
            caretPadding: number;
            /**  if true, color boxes are shown in the tooltip */
            displayColors: boolean;
            /** Color of the border */
            borderColor: Chart.ChartColor;
            /** Size of the border */
            borderWidth: number;

            constructor() {
                this.enabled = true;
                this.custom = null;
                this.mode = 'nearest';
                this.intersect = true;
                this.position = 'average';
                //callbacks	Object		See the callbacks section
                //itemSort	=		Sort tooltip items.more...
                //filter	=		Filter tooltip items.more...
                this.backgroundColor = 'rgba(0,0,0,0.8)';
                this.titleFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                this.titleFontSize = 12;
                this.titleFontStyle = 'bold';
                this.titleFontColor = '#fff';
                this.titleSpacing = 2;
                this.titleMarginBottom = 6;
                this.bodyFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                this.bodyFontSize = 12;
                this.bodyFontStyle = 'normal';
                this.bodyFontColor = '#fff';
                this.bodySpacing = 2;
                this.footerFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                this.footerFontSize = 12;
                this.footerFontStyle = 'bold';
                this.footerFontColor = '#fff';
                this.footerSpacing = 2;
                this.footerMarginTop = 6;
                this.xPadding = 6;
                this.yPadding = 6;
                this.caretPadding = 2;
                this.caretSize = 5;
                this.cornerRadius = 6;
                this.multiKeyBackground = '#fff';
                this.displayColors = true;
                this.borderColor = 'rgba(0,0,0,0)';
                this.borderWidth = 0;
            }

        }

        /**  */
        export class ChartHoverOptions implements Chart.ChartHoverOptions {
            /** Sets which elements appear in the tooltip. Interaction mode. point|nearest|index|dataset|x|y */
            mode: string;
            /** Duration in milliseconds it takes to animate hover style changes. */
            animationDuration: number;
            /** if true, the hover mode only applies when the mouse position intersects an item on the chart. */
            intersect: boolean;
            onHover: (active: any) => void;

            constructor() {
                this.mode = 'nearest';
                this.intersect = true;
                this.animationDuration = 400;
            }
        }

        /**  */
        export class ChartAnimationOptions implements Chart.ChartAnimationOptions {
            /** The number of milliseconds an animation takes */
            duration: number;
            /** Easing function to use. Examples:
            'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint',
            'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc',
            'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce'
            */
            easing: string;
            /** Callback called on each step of an animation */
            onProgress: (animation: Chart.ChartAnimationObject) => void;
            /** Callback called at the end of an animation */
            onComplete: (animation: Chart.ChartAnimationObject) => void;
        }

        /**  */
        export class ChartElementsOptions implements Chart.ChartElementsOptions {
            point: Chart.ChartPointOptions;
            line: Chart.ChartLineOptions;
            arc: Chart.ChartArcOptions;
            rectangle: Chart.ChartRectangleOptions;

            constructor() {
                this.point = new ChartPointOptions();
                this.line = new ChartLineOptions();
                this.arc = new ChartArcOptions();
                this.rectangle = new ChartRectangleOptions();
            }
        }

        /**  */
        export class ChartPointOptions implements Chart.ChartPointOptions {
            radius: number;
            pointStyle: string;
            backgroundColor: Chart.ChartColor;
            borderWidth: number;
            borderColor: Chart.ChartColor;
            hitRadius: number;
            hoverRadius: number;
            hoverBorderWidth: number;

            constructor() {
                this.radius = 3;
                this.pointStyle = 'circle';
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderWidth = 1;
                this.borderColor = 'rgba(0,0,0,0.1)';
                this.hitRadius = 1;
                this.hoverRadius = 4;
                this.hoverBorderWidth = 1;
            }
        }

        /**  */
        export class ChartLineOptions implements Chart.ChartLineOptions {
            tension: number;
            backgroundColor: Chart.ChartColor;
            borderWidth: number;
            borderColor: Chart.ChartColor;
            borderCapStyle: string;
            borderDash: any[];
            borderDashOffset: number;
            borderJoinStyle: string;
            capBezierPoints: boolean;
            fill: 'zero' | 'top' | 'bottom' | boolean;
            stepped: boolean;

            constructor() {
                this.tension = 0.4;
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderWidth = 3;
                this.borderColor = 'rgba(0,0,0,0.1)';
                this.borderCapStyle = 'butt';
                this.borderDash = [];
                this.borderDashOffset = 0;
                this.borderJoinStyle = 'miter';
                this.capBezierPoints = true;
                this.fill = true;
                this.stepped = false;
            }
        }

        /**  */
        export class ChartArcOptions implements Chart.ChartArcOptions {
            backgroundColor: Chart.ChartColor;
            borderColor: Chart.ChartColor;
            borderWidth: number;

            constructor() {
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderColor = '#fff';
                this.borderWidth = 2;
            }
        }

        /**  */
        export class ChartRectangleOptions implements Chart.ChartRectangleOptions {
            backgroundColor: Chart.ChartColor;
            borderWidth: number;
            borderColor: Chart.ChartColor;
            borderSkipped: string;

            constructor() {
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderWidth = 0;
                this.borderColor = 'rgba(0,0,0,0.1)';
                this.borderSkipped = 'bottom';
            }
        }

        /**  */
        export class ChartScales implements Chart.ChartScales {
            type: Chart.ScaleType | string;
            display: boolean;
            position: Chart.PositionType | string;
            beforeUpdate: (scale?: any) => void;
            beforeSetDimension: (scale?: any) => void;
            beforeDataLimits: (scale?: any) => void;
            beforeBuildTicks: (scale?: any) => void;
            beforeTickToLabelConversion: (scale?: any) => void;
            beforeCalculateTickRotation: (scale?: any) => void;
            beforeFit: (scale?: any) => void;
            afterUpdate: (scale?: any) => void;
            afterSetDimension: (scale?: any) => void;
            afterDataLimits: (scale?: any) => void;
            afterBuildTicks: (scale?: any) => void;
            afterTickToLabelConversion: (scale?: any) => void;
            afterCalculateTickRotation: (scale?: any) => void;
            afterFit: (scale?: any) => void;
            gridLines: Chart.GridLineOptions;
            scaleLabel: Chart.ScaleTitleOptions;
            ticks: Chart.TickOptions;
            xAxes: Chart.ChartXAxe[];
            yAxes: Chart.ChartYAxe[];

            constructor() {
            }

        }

        /**  */
        export class TimeDisplayFormat implements Chart.TimeDisplayFormat {
            millisecond: string;
            second: string;
            minute: string;
            hour: string;
            day: string;
            week: string;
            month: string;
            quarter: string;
            year: string;
        }

        /**  */
        export class TimeScale extends ChartScales implements Chart.TimeScale {
            displayFormats: TimeDisplayFormat;
            isoWeekday: boolean;
            max: string;
            min: string;
            parser: string | ((arg: any) => any);
            round: Chart.TimeUnit;
            tooltipFormat: string;
            unit: Chart.TimeUnit;
            unitStepSize: number;
            minUnit: Chart.TimeUnit;

            constructor() {
                super();
            }
        }

        /**  */
        export class RadialLinearScale implements Chart.RadialLinearScale {
            lineArc: boolean;
            angleLines: Chart.AngleLineOptions;
            pointLabels: Chart.PointLabelOptions;
            ticks: Chart.TickOptions;
        }

        /**  */
        export class LinearScale extends ChartScales implements Chart.LinearScale {
            ticks: Chart.LinearTickOptions;

            constructor() {
                super();
            }
        }

        /**  */
        export class LogarithmicScale extends ChartScales implements Chart.LogarithmicScale {
            ticks: Chart.LogarithmicTickOptions;

            constructor() {
                super();
            }
        }

        /**  */
        export class GridLineOptions implements Chart.GridLineOptions {
            display: boolean;
            color: Chart.ChartColor;
            lineWidth: number;
            drawBorder: boolean;
            drawOnChartArea: boolean;
            drawticks: boolean;
            tickMarkLength: number;
            zeroLineWidth: number;
            zeroLineColor: Chart.ChartColor;
            offsetGridLines: boolean;
        }

        /**  */
        export class ScaleTitleOptions implements Chart.ScaleTitleOptions {
            display: boolean;
            labelString: string;
            fontColor: Chart.ChartColor;
            fontFamily: string;
            fontSize: number;
            fontStyle: string;
        }

        /**  */
        export class TickOptions implements Chart.TickOptions {
            autoSkip: boolean;
            callback: (value: any, index: any, values: any) => string | number;
            display: boolean;
            fontColor: Chart.ChartColor;
            fontFamily: string;
            fontSize: number;
            fontStyle: string;
            labelOffset: number;
            maxRotation: number;
            minRotation: number;
            mirror: boolean;
            padding: number;
            reverse: boolean;
            min: any;
            max: any;
            backdropColor: Chart.ChartColor;
            backdropPaddingX: number;
            backdropPaddingY: number;
            maxTicksLimit: number;
            showLabelBackdrop: boolean;

            constructor() {
            }
        }

        /**  */
        export class AngleLineOptions implements Chart.AngleLineOptions {
            display: boolean;
            color: Chart.ChartColor;
            lineWidth: number;
        }

        /**  */
        export class PointLabelOptions implements Chart.PointLabelOptions {
            callback: (arg: any) => any;
            fontColor: Chart.ChartColor;
            fontFamily: string;
            fontSize: number;
            fontStyle: string;

            constructor() {
            }
        }

        /**  */
        export class LinearTickOptions extends TickOptions implements Chart.LinearTickOptions {
            beginAtZero: boolean;
            min: number;
            max: number;
            maxTicksLimit: number;
            stepSize: number;
            suggestedMin: number;
            suggestedMax: number;

            constructor() {
                super();
            }
        }

        /**  */
        export class LogarithmicTickOptions extends TickOptions implements Chart.LogarithmicTickOptions {
            min: number;
            max: number;

            constructor() {
                super();
            }
        }

        /**  */
        export class CommonAxe implements Chart.CommonAxe {
            type: Chart.ScaleType | string;
            display: boolean;
            id: string;
            stacked: boolean;
            position: string;
            ticks: Chart.TickOptions;
            gridLines: Chart.GridLineOptions;
            barThickness: number;
            scaleLabel: Chart.ScaleTitleOptions;

            constructor() {
            }
        }

        /**  */
        export class ChartYAxe extends CommonAxe implements Chart.ChartYAxe {
            constructor() {
                super();
            }
        }

        /**  */
        export class ChartXAxe extends CommonAxe implements Chart.ChartXAxe {
            categoryPercentage: number;
            barPercentage: number;
            time: Chart.TimeScale;

            constructor() {
                super();
            }
        }

        /**  */
        export class ChartData implements Chart.ChartData {
            labels: Array<string | string[]>;
            datasets: Chart.ChartDataSets[];

            constructor() {
                this.labels = [];
                this.datasets = [];
            }
        }

        /**  */
        export interface ChartPointBubble extends Chart.ChartPoint {
            /** radius of the bubble. r  is not scaled by the chart. It is the raw radius in pixels of the bubble that is drawn on the canvas. */
            r?: number;
        }

        /** The line chart properties to be specified for each dataset. These are used to set display properties for a specific dataset.
         * For example, the colour of a line is generally set this way.
         * All point* properties can be specified as an array. If these are set to an array value, the first value applies to the first point, the second value to the second point, and so on.
         */
        export class LineChartDataSets implements Chart.ChartDataSets {
            //BEGIN Dataset Properties
            /** The label for the dataset which appears in the legend and tooltips */
            label: string;
            /** The ID of the x axis to plot this dataset on. If not specified, this defaults to the ID of the first found x axis */
            xAxisID: string;
            /** The ID of the y axis to plot this dataset on. If not specified, this defaults to the ID of the first found y axis */
            yAxisID: string;

            /** Data to be plotted */
            data: number[] | Chart.ChartPoint[];

            /** The fill color under the line */
            backgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the line in pixels */
            borderWidth: number;
            /** The color of the line */
            borderColor: Chart.ChartColor;
            /** Cap style of the line. */
            borderCapStyle: string;
            /** Length and spacing of dashes.  */
            borderDash: number[];
            /** Offset for line dashes. */
            borderDashOffset: number;
            /** Line joint style */
            borderJoinStyle: string;

            /** Algorithm used to interpolate a smooth curve from the discrete data points */
            cubicInterpolationMode: string;
            /** How to fill the area under the line */
            fill: boolean | string;
            /** Bezier curve tension of the line. Set to 0 to draw straightlines. This option is ignored if monotone cubic interpolation is used. */
            lineTension: number;
            /** The border color for points. */
            pointBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** The fill color for points. */
            pointBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the point border in pixels. */
            pointBorderWidth: number | number[];
            /** The radius of the point shape. If set to 0, the point is not rendered. */
            pointRadius: number | number[];
            /** The radius of the point when hovered. */
            pointHoverRadius: number | number[];
            /** The pixel size of the non-displayed point that reacts to mouse events. */
            pointHitRadius: number | number[];
            /** Point background color when hovered. */
            pointHoverBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** Point border color when hovered */
            pointHoverBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** Border width of point when hovered. */
            pointHoverBorderWidth: number | number[];
            /** Style of the point. i.e. 'circle','cross','crossRot','dash'.,'line','rect','rectRounded','rectRot','star','triangle'  */
            pointStyle: string | string[] | HTMLImageElement | HTMLImageElement[];
            /** If true, lines will be drawn between points with no or null data. If false, points with  NaN  data will create a break in the line */
            spanGaps: string;
            /** Extra. If false, the line is not drawn for this dataset */
            showLine: boolean;
            /** Extra. If the line is shown as a stepped line. */
            steppedLine: boolean | string;
            /** sets the type of this dataset for creating mixed charts */
            type: string;
            /**  */
            hidden: boolean;
            /**  */
            hideInLegendAndTooltip: boolean;
            /** Bar Chart/Stacked area only: The ID of the group to which this dataset belongs to (when stacked, each group will be a separate stack) */
            stack: string;

            //BEGIN Dataset Properties
            constructor() {
                this.type = 'line';
            }

            static basicDataSet(label?: string, data?: number[] | Chart.ChartPoint[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** The bar chart allows a number of properties to be specified for each dataset. These are used to set display properties for a specific dataset.
         * For example, the colour of the bars is generally set this way.
         * Some properties can be specified as an array. If these are set to an array value, the first value applies to the first bar, the second value to the second bar, and so on.
         */
        export class BarChartDataSets implements Chart.ChartDataSets {

            //BEGIN Dataset Properties
            /** The label for the dataset which appears in the legend and tooltips */
            label: string;
            /** The ID of the x axis to plot this dataset on. If not specified, this defaults to the ID of the first found x axis */
            xAxisID: string;
            /** The ID of the y axis to plot this dataset on. If not specified, this defaults to the ID of the first found y axis */
            yAxisID: string;

            /** Data to be plotted */
            data: number[] | Chart.ChartPoint[];

            /** The fill color under the line */
            backgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the line in pixels */
            borderWidth: number;
            /** The color of the line */
            borderColor: Chart.ChartColor;
            /** Which edge to skip drawing the border for. ex: 'bottom','left','top','right' */
            borderSkipped: string;

            /** The fill colour of the bars when hovered. */
            hoverBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke colour of the bars when hovered. */
            hoverBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke width of the bars when hovered. */
            hoverBorderWidth: number | number[];
            /** Bar Chart/Stacked area only: The ID of the group to which this dataset belongs to (when stacked, each group will be a separate stack) */
            stack: string;
            //END Dataset Properties
            /** sets the type of this dataset for creating mixed charts */
            type: string;
            //BEGIN Config options
            barPercentage: number;
            categoryPercentage: number;
            barThickness: number;
            maxBarThickness: number;
            gridLines: { offsetGridLines: boolean };

            constructor() {
                this.type = 'bar';
                this.barPercentage = 0.9
                this.categoryPercentage = 0.8
                this.barThickness;
                this.maxBarThickness;
                this.gridLines.offsetGridLines = true;
            }

            //END Config Options
            static basicDataSet(label?: string, data?: number[] | Chart.ChartPoint[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** The following options can be included in a polar area chart dataset to configure options for that specific dataset. */
        export class PolarChartDataSets implements Chart.ChartDataSets {

            //BEGIN Dataset Properties
            /** The label for the dataset which appears in the legend and tooltips */
            label: string;
            /** For a polar area chart, datasets need to contain an array of data points. The data points should be a number, Chart.js will total all of the numbers and calculate the relative proportion of each.
             * You also need to specify an array of labels so that tooltips appear correctly for each slice
             */
            data: number[] | Chart.ChartPoint[];

            /** The fill color under the line */
            backgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the line in pixels */
            borderWidth: number;
            /** The color of the line */
            borderColor: Chart.ChartColor;
            /** The fill colour of the bars when hovered. */
            hoverBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke colour of the bars when hovered. */
            hoverBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke width of the bars when hovered. */
            hoverBorderWidth: number | number[];

            //END Dataset Properties
            //BEGIN Config options
            /** Starting angle to draw arcs for the first item in a dataset. */
            startAngle: number;
            /** sets the type of this dataset for creating mixed charts */
            type: string;
            animate: {
                /** If true, the chart will animate in with a rotation animation. This property is in the  options.animation  object. */
                animateRotate: boolean,
                /** If true, will animate scaling the chart from the center outwards. */
                animateScale: boolean
            };

            constructor() {
                this.type = 'polarArea';
                this.startAngle = (-0.5 * Math.PI);
                this.animate.animateRotate = true;
                this.animate.animateScale = true;
            }

            //END Config Options
            static basicDataSet(label?: string, data?: number[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** The following options can be included in a polar area chart dataset to configure options for that specific dataset. */
        export class RadarChartDataSets implements Chart.ChartDataSets {
            /** The label for the dataset which appears in the legend and tooltips. */
            label: string;
            /** The fill color under the line. */
            backgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The color of the line. */
            borderColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the line in pixels */
            borderWidth: number | number[];
            /** Length and spacing of dashes. */
            borderDash: number[];
            /** Offset for line dashes */
            borderDashOffset: number;
            /** Cap style of the line. */
            borderCapStyle: string;
            /** Line joint style */
            borderJoinStyle: string;
            /** How to fill the area under the line. See area charts */
            fill: boolean | string;
            /** Bezier curve tension of the line. Set to 0 to draw straightlines. */
            lineTension: number;
            /** The fill color for points */
            pointBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The border color for points. */
            pointBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the point border in pixels */
            pointBorderWidth: number | number[];
            /** The radius of the point shape. If set to 0, the point is not rendered. */
            pointRadius: number | number[];
            /** Style of the point 'circle'. i.e. 'cross','crossRot','dash','line','rect','rectRounded','rectRot','star','triangle',*/
            pointStyle: string | string[] | HTMLImageElement | HTMLImageElement[];
            /** The pixel size of the non-displayed point that reacts to mouse events */
            pointHitRadius: number | number[];
            /** Point background color when hovered */
            pointHoverBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** Point border color when hovered. */
            pointHoverBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** Border width of point when hovered. */
            pointHoverBorderWidth: number | number[];
            /** The radius of the point when hovered. */
            pointHoverRadius: number | number[];
            /** sets the type of this dataset for creating mixed charts */
            type: string;

            constructor() {
                this.type = 'radar';
            }
        }

        /** The doughnut/pie chart allows a number of properties to be specified for each dataset.
         *These are used to set display properties for a specific dataset. For example, the colour of a the dataset's arc are generally set this way.
         */
        export class CutoutChartDataSets implements Chart.ChartDataSets {

            //BEGIN Dataset Properties
            /** The label for the dataset which appears in the legend and tooltips */
            label: string;
            /** Data to be plotted */
            data: number[] | Chart.ChartPoint[];

            /** The fill color under the line */
            backgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the line in pixels */
            borderWidth: number;
            /** The color of the line */
            borderColor: Chart.ChartColor;
            /** The fill colour of the bars when hovered. */
            hoverBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke colour of the bars when hovered. */
            hoverBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke width of the bars when hovered. */
            hoverBorderWidth: number | number[];

            //END Dataset Properties
            //BEGIN Config options
            /** The percentage of the chart that is cut out of the middle. */
            cutoutPercentage: number;
            /** Starting angle to draw arcs from */
            rotation: number;
            /** Sweep to allow arcs to cover */
            circumference: number;
            /**  */
            maxBarThickness: number;
            /** sets the type of this dataset for creating mixed charts */
            type: string;
            animate: {
                /** If true, the chart will animate in with a rotation animation. This property is in the  options.animation  object. */
                animateRotate: boolean,
                /** If true, will animate scaling the chart from the center outwards. */
                animateScale: boolean
            };

            constructor(cutoutPercentage?: number) {
                this.cutoutPercentage = (cutoutPercentage || 0);
                this.rotation = (-0.5 * Math.PI);
                this.circumference = (2 * Math.PI);
                this.animate.animateRotate = true;
                this.animate.animateScale = false;
            }

            //END Config Options
            static basicDataSet(label?: string, data?: number[] | Chart.ChartPoint[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** The doughnut/pie chart allows a number of properties to be specified for each dataset.
         *These are used to set display properties for a specific dataset. For example, the colour of a the dataset's arc are generally set this way.
         */
        export class DoughnutChartDataSets extends CutoutChartDataSets {
            constructor() {
                super();
                this.type = 'doughnut';
                this.cutoutPercentage = 50;
            }

            static basicDataSet(label?: string, data?: number[] | Chart.ChartPoint[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** The doughnut/pie chart allows a number of properties to be specified for each dataset.
         *These are used to set display properties for a specific dataset. For example, the colour of a the dataset's arc are generally set this way.
         */
        export class PieChartDataSets extends CutoutChartDataSets {
            constructor() {
                super();
                this.type = 'pie';
                this.cutoutPercentage = 0;
            }

            static basicDataSet(label?: string, data?: number[] | Chart.ChartPoint[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** The bubble chart allows a number of properties to be specified for each dataset.
         * These are used to set display properties for a specific dataset. For example, the colour of the bubbles is generally set this way.
         * All properties, except  label  can be specified as an array. If these are set to an array value, the first value applies to the first bubble
         * in the dataset, the second value to the second bubble, and so on
         */
        export class BubbleChartDataSets implements Chart.ChartDataSets {
            //BEGIN Dataset Properties
            /** The label for the dataset which appears in the legend and tooltips */
            label: string;
            /** Data to be plotted. special bubble data */
            data: number[] | ChartPointBubble[];

            /** The fill color under the line */
            backgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The width of the line in pixels */
            borderWidth: number;
            /** The color of the line */
            borderColor: Chart.ChartColor;
            /** Which edge to skip drawing the border for. ex: 'bottom','left','top','right' */
            borderSkipped: string;

            /** The fill colour of the bars when hovered. */
            hoverBorderColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke colour of the bars when hovered. */
            hoverBackgroundColor: Chart.ChartColor | Chart.ChartColor[];
            /** The stroke width of the bars when hovered. */
            hoverBorderWidth: number | number[];
            /** Additional radius to add when hovered */
            hoverRadius: number | number[];

            //BEGIN Dataset Properties
            /** sets the type of this dataset for creating mixed charts */
            type: string;

            constructor() {
                this.type = 'bubble';
            }

            static basicDataSet(label?: string, data?: ChartPointBubble[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** The scatter chart supports all of the same properties as the line chart
         * For example, the colour of a line is generally set this way.
         * All point* properties can be specified as an array. If these are set to an array value, the first value applies to the first point, the second value to the second point, and so on.
         */
        export class ScatterChartDataSets extends LineChartDataSets {
            constructor() {
                super();
                this.type = 'scatter';
            }

            static basicDataSet(label?: string, data?: Chart.ChartPoint[], color?: Chart.ChartColor) {
                let result = new this();
                result.label = (label || '');
                result.data = (data || []);
                result.backgroundColor = (color || '#777');
                result.borderColor = (color || '#777');
                return result;
            }
        }

        /** Point elements are used to represent the points in a line chart or a bubble chart */
        export interface PointConfiguration {
            /** Point radius. */
            radius: number;
            /** Point style. */
            pointStyle: string;
            /** Point fill color. */
            backgroundColor: Chart.ChartColor;
            /** Point stroke width. */
            borderWidth: number;
            /** Point stroke color. */
            borderColor: Chart.ChartColor;
            /** Extra radius added to point radius for hit detection. */
            hitRadius: number;
            /** Point radius when hovered. */
            hoverRadius: number;
            /** Stroke width when hovered. */
            hoverBorderWidth: number;
        }

        /** Point elements are used to represent the points in a line chart or a bubble chart */
        export class PointConfiguration implements PointConfiguration {

            constructor() {
                this.radius = 3;
                this.pointStyle = 'circle';
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderWidth = 1;
                this.borderColor = 'rgba(0,0,0,0.1)';
                this.hitRadius = 1;
                this.hoverRadius = 4;
                this.hoverBorderWidth = 1;
            }
        }

        /** Line elements are used to represent the line in a line chart. */
        export interface LineConfiguration {
            /** Bézier curve tension ( 0  for no Bézier curves). */
            tension: number;
            /** Line fill color */
            backgroundColor: Chart.ChartColor;
            /** Line stroke width */
            borderWidth: number;
            /** Line stroke color */
            borderColor: Chart.ChartColor;
            /** Line cap style  */
            borderCapStyle: string;
            /** An Array of numbers which specify distances to alternately draw a line and a gap (in coordinate space units). 
             * If the number of elements in the array is odd, the elements of the array get copied and concatenated.
             */
            borderDash: number[];
            /** Line dash offset  */
            borderDashOffset: number;
            /** Line join style  */
            borderJoinStyle: string;
            /** true  to keep Bézier control inside the chart,  false  for no restriction */
            capBezierPoints: boolean;
            /** Fill location:  'zero' ,  'top' ,  'bottom' ,  true  (eq.  'zero' ) or  false  (no fill). */
            fill: boolean | string;
            /** true  to show the line as a stepped line ( tension  will be ignored). */
            stepped: boolean;
        }

        /** Line elements are used to represent the line in a line chart. */
        export class LineConfiguration implements LineConfiguration {
            constructor() {
                this.tension = 0.4;
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderWidth = 3;
                this.borderColor = 'rgba(0,0,0,0.1)';
                this.borderCapStyle = 'butt';
                this.borderDash = [];
                this.borderDashOffset = 0;
                this.borderJoinStyle = 'miter';
                this.capBezierPoints = true;
                this.fill = true;
                this.stepped = false;
            }
        }


        /** Rectangle elements are used to represent the bars in a bar chart. */

        export interface RectangleConfiguration {
            /** Bar fill color */
            backgroundColor: Chart.ChartColor;
            /** Bar stroke width. */
            borderWidth: number;
            /** Bar stroke color. */
            borderColor: Chart.ChartColor;
            /** Skipped (excluded) border:  'bottom' ,  'left' ,  'top'  or  'right'  */
            borderSkipped: string;
        }

        /** Rectangle elements are used to represent the bars in a bar chart. */
        export class RectangleConfiguration implements RectangleConfiguration {
            constructor() {
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderWidth = 0;
                this.borderColor = 'rgba(0,0,0,0.1)';
                this.borderSkipped = 'bottom';
            }
        }

        /** Arcs are used in the polar area, doughnut and pie charts */
        export interface ArcConfiguration {
            /** Arc fill color */
            backgroundColor: Chart.ChartColor;
            /** Arc stroke color */
            borderColor: Chart.ChartColor;
            /** Arc stroke width */
            borderWidth: number;
        }

        /** Arcs are used in the polar area, doughnut and pie charts */
        export class ArcConfiguration implements ArcConfiguration {
            constructor() {
                this.backgroundColor = 'rgba(0,0,0,0.1)';
                this.borderColor = '#fff';
                this.borderWidth = 2;
            }
        }

        export namespace Sample {
            export function getLineSample1(ctx: string |
                                                JQuery |
                                                CanvasRenderingContext2D |
                                                HTMLCanvasElement |
                                                string[] |
                                                CanvasRenderingContext2D[] |
                                                HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createLineChart(ctx, (data || lineSample1Data), (options || lineSample1Options));
                return result;
            };

            let lineSample1Data: Chart.ChartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "First Sample Dataset",
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        lineTension: 0.1
                    }
                ]
            };
            let lineSample1Options: Chart.ChartOptions = {};

            export function getBarSample1(ctx: string |
                                               JQuery |
                                               CanvasRenderingContext2D |
                                               HTMLCanvasElement |
                                               string[] |
                                               CanvasRenderingContext2D[] |
                                               HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createBarChart(ctx, (data || barSample1Data), (options || barSample1Options));
                return result;
            };

            let barSample1Data: Chart.ChartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First Dataset",
                        "data": [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(255, 205, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(201, 203, 207, 0.2)"
                        ],
                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)"
                        ],
                        borderWidth: 1
                    }
                ]
            };
            let barSample1Options: Chart.ChartOptions = {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            };

            export function getRadarSample1(ctx: string |
                                                 JQuery |
                                                 CanvasRenderingContext2D |
                                                 HTMLCanvasElement |
                                                 string[] |
                                                 CanvasRenderingContext2D[] |
                                                 HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createRadarChart(ctx, (data || radarSample1Data), (options || radarSample1Options));
                return result;
            };

            let radarSample1Data: Chart.ChartData = {
                labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                datasets: [
                    {
                        label: "My First Dataset",
                        data: [65, 59, 90, 81, 56, 55, 40],
                        fill: true,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgb(255, 99, 132)",
                        pointBackgroundColor: "rgb(255, 99, 132)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(255, 99, 132)"
                    },
                    {
                        label: "My Second Dataset",
                        data: [28, 48, 40, 19, 96, 27, 100],
                        fill: true,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgb(54, 162, 235)",
                        pointBackgroundColor: "rgb(54, 162, 235)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(54, 162, 235)"
                    }
                ]
            };
            let radarSample1Options: Chart.ChartOptions = {
                elements: {
                    line: {
                        tension: 0,
                        borderWidth: 3
                    }
                }
            };

            export function getPieSample1(ctx: string |
                                               JQuery |
                                               CanvasRenderingContext2D |
                                               HTMLCanvasElement |
                                               string[] |
                                               CanvasRenderingContext2D[] |
                                               HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createPieChart(ctx,
                    (data || piedoughnutSample1Data()),
                    (options || piedoughnutSample1Options));

                return result;
            };

            export function getDoughnutSample1(ctx: string |
                                                    JQuery |
                                                    CanvasRenderingContext2D |
                                                    HTMLCanvasElement |
                                                    string[] |
                                                    CanvasRenderingContext2D[] |
                                                    HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createDoughnutChart(ctx,
                    (data || piedoughnutSample1Data()),
                    (options || piedoughnutSample1Options));
                return result;
            };

            function piedoughnutSample1Data(): Chart.ChartData {
                return {
                    labels: ["Red", "Blue", "Yellow"],
                    datasets: [
                        {
                            label: "My First Dataset",
                            data: [300, 50, 100],
                            backgroundColor:
                            [
                                "rgb(255, 99, 132)",
                                "rgb(54, 162, 235)",
                                "rgb(255, 205, 86)"
                            ]
                        }
                    ]
                };
            }

            function piedoughnutSample2Data(): Chart.ChartData {
                let result = new ChartData();
                result.labels = ["Red", "Blue", "Yellow"];
                let datasetLabel = 'My First Dataset';
                let datasetData: number[] = [300, 50, 100];
                let backgroundColor: Chart.ChartColor[] =
                    ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"];
                let dataset1 = PieChartDataSets.basicDataSet();
                dataset1.label = datasetLabel;
                dataset1.data = datasetData;
                dataset1.backgroundColor = backgroundColor;
                result.datasets = [dataset1];
                return result;
            }

            let piedoughnutSample1Options: Chart.ChartOptions = {};

            export function getPolarAreaSample1(ctx: string |
                                                     JQuery |
                                                     CanvasRenderingContext2D |
                                                     HTMLCanvasElement |
                                                     string[] |
                                                     CanvasRenderingContext2D[] |
                                                     HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createPolarAreaChart(ctx,
                    (data || polarAreaSample1Data()),
                    (options || polarAreaSample1Options));
                return result;
            };

            function polarAreaSample1Data(): Chart.ChartData {
                return {
                    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
                    datasets: [
                        {
                            label: "My First Dataset",
                            data: [11, 16, 7, 3, 14],
                            backgroundColor:
                            [
                                "rgb(255, 99, 132)",
                                "rgb(75, 192, 192)",
                                "rgb(255, 205, 86)",
                                "rgb(201, 203, 207)",
                                "rgb(54, 162, 235)"
                            ]
                        }
                    ]
                };
            }

            let polarAreaSample1Options: Chart.ChartOptions = {};

            function polarAreaSample2Data(): Chart.ChartData {
                let result = new ChartData();
                result.labels = ["Red", "Green", "Yellow", "Grey", "Blue"];
                let datasetLabel = 'My First Dataset';
                let datasetData: number[] = [11, 16, 7, 3, 14];
                let backgroundColor: Chart.ChartColor[] = [
                    "rgb(255, 99, 132)",
                    "rgb(75, 192, 192)",
                    "rgb(255, 205, 86)",
                    "rgb(201, 203, 207)",
                    "rgb(54, 162, 235)"
                ];
                let dataset1 = PolarChartDataSets.basicDataSet(datasetLabel, datasetData, backgroundColor)
                result.datasets = [dataset1];
                return result;
            }

            export function getBubbleSample1(ctx: string |
                                                  JQuery |
                                                  CanvasRenderingContext2D |
                                                  HTMLCanvasElement |
                                                  string[] |
                                                  CanvasRenderingContext2D[] |
                                                  HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createBubbleChart(ctx, (data || bubbleSample1Data), (options || bubbleSample1Options));
                return result;
            };

            let bubbleSample1Data: Chart.ChartData = {
                datasets: [
                    {
                        label: "First Dataset",
                        data:
                        [
                            { "x": 20, "y": 30, "r": 15 },
                            { "x": 40, "y": 10, "r": 10 }
                        ],
                        "backgroundColor": "rgb(255, 99, 132)"
                    }
                ]
            };
            let bubbleSample1Options: Chart.ChartOptions = {};

            export function getScatterSample1(ctx: string |
                                                   JQuery |
                                                   CanvasRenderingContext2D |
                                                   HTMLCanvasElement |
                                                   string[] |
                                                   CanvasRenderingContext2D[] |
                                                   HTMLCanvasElement[],
                data?: Chart.ChartData,
                options?: Chart.ChartOptions) {
                let result = createScatterChart(ctx, (data || scatterSample1Data), (options || scatterSample1Options));
                return result;
            };

            let scatterSample1Data: Chart.ChartData = {
                datasets: [
                    {
                        label: 'Scatter Dataset',
                        data:
                        [
                            {
                                x: -10,
                                y: 0
                            },
                            {
                                x: 0,
                                y: 10
                            },
                            {
                                x: 10,
                                y: 5
                            }
                        ]
                    }
                ]
            };
            let scatterSample1Options: Chart.ChartOptions = {
                scales: {
                    xAxes: [
                        {
                            type: 'linear',
                            position: 'bottom'
                        }
                    ]
                }
            };
        }
    }
}