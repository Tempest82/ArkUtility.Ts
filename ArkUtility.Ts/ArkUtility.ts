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

    /** Specifies whether a method should be logged verbose, treated as true if isDebug = true */
    let logVerbose: boolean = false;
    /** Specifies debug mode and will override logVerbose if true */
    let isDebug: boolean = false;
    /** Takes a number or string and if it is less than ten adds a preceeding zero */
    export function addZero(i: number | string): string {
        if (i < 10)
        { i = "0" + i; }
        return i.toString();
    };
    /** 
     * Raise a javascript Alert Prompt
     * @param message - Message to log
     * @param verbose - Indicates whether this message is a verbose message
     */
    export function alert(message: string, verbose: boolean): void {
        if (!verbose || (verbose && (logVerbose || isDebug))) {
            window.alert(message + ' ' + (new Date()).toUTCString());
        }
    };
    /**
     *  Log a javascript console.debug message, if in debug mode
     *  @param {string} message - Message to log
     */
    export function debug(message: string): void {
        if (isDebug && window.console && window.console.debug) {
            console.debug(message + ' ' + (new Date()).toUTCString());
        }
    };
    /**
     *  Log a javascript console message of the specified severity level
     *  @param {boolean} verbose - Indicates whether this message is a verbose message. Default False.
     *  @param {LogLevel} level - Indicates severity of this message message. Default False.
     */
    export function log(message: string | Object, verbose?: boolean, level?: LogLevel): void {
        if (!window.console)
            return;
        if (!verbose || (verbose && (logVerbose || isDebug))) {
            switch (level) {
                case LogLevel.Info:
                    if (console.info) { console.info(message); }
                    break;
                case LogLevel.Warning:
                    if (console.warn) { console.warn(message); }
                    break;
                case LogLevel.Error:
                    if (console.error) { console.error(message); }
                    break;
                default:
                    if (console.log) { console.log(message); }
                    break;
            }
        }
    };
    /**
     * Alias for new Date()
     */
    export function now(): Date { return new Date(); }
    /**
     * Array of 3 letter month abbreviations
     */
    export let monthAbbreviations = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    /**
     * Check for onClick arrtibute if it doesn't exist add it. This will allow the jQuery on('click') to fire.
     * @param jqueryNode - a Jquery object to have it's attr checked for onclick.
     */
    export function ensureOnClickAttr(jqueryNode: any) {
        if (typeof jqueryNode.attr('onClick') === 'undefined') {
            jqueryNode.attr('onClick', 'return true');
        }
    }
    /**
     * Returns the value of a specified query parameter
     * @param paramName
     */
    export function getQueryStringParamValue(paramName: string): string {
        let result = null;
        let items = location.search.substring(1).split('&').forEach(function (item) {
            let paramKvp = item.split('=');
            if (paramKvp[0].toLowerCase() === paramName.toLowerCase()) {
                result = decodeURIComponent(paramKvp[1]);
            }
        });
        return result;
    }
    export function getDefaultJsonHeader() { return { "Accept": "application/json;odata=verbose" }; }
    export function getJsonContentType() { return "application/json"; }
    /**
     * Facilitates handling Ajax returns.
     */
    export interface AjaxRequestHandlers {
        successHandler: (data: any, textStatus: string, jqXHR: JQueryXHR) => void;
        errorHandler: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void;
        completehandler: (jqXHR: JQueryXHR, textStatus: string) => void;
    }
    /**
     * Facilitates handling Ajax returns in the simplest form.
     */
    export class BasicAjaxRequestHandlers implements AjaxRequestHandlers {
        successHandler: (data: any, textStatus: string, jqXHR: JQueryXHR) => void;
        errorHandler: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void;
        completehandler: (jqXHR: JQueryXHR, textStatus: string) => void;
        constructor() {
            //declarations to ensure javascript output exposes the object properties cleanly
            this.successHandler = null;
            this.errorHandler = null;
            this.completehandler = null;
        }
    }
    /**
     * Facilitates building Ajax requests.
     */
    export class AjaxRequestParams implements AjaxRequestHandlers {
        contentType: string;
        url: string;
        isGet: boolean;
        headers: any;
        data: any;
        successHandler: (data: any, textStatus: string, jqXHR: JQueryXHR) => void;
        errorHandler: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void;
        completehandler: (jqXHR: JQueryXHR, textStatus: string) => void;
        constructor() {
            this.contentType = 'application/json';
            this.isGet = true;
            this.headers = {
                'Accept': 'application/json',
                'content-type': 'application/json',
            };
            //declarations to ensure javascript output exposes the object properties cleanly
            this.data = null;
            this.url = null;
            this.successHandler = null;
            this.errorHandler = null;
            this.completehandler = null;
        }
    }
    /**
     * Builds and executes an ajax request based on the AjaxRequestParams. Requires jQuery.
     * @param ajaxRequestParams
     */
    export function ajaxRequest(ajaxRequestParams: AjaxRequestParams): void {
        log('Beginning processing request to ' + ajaxRequestParams.url, true, LogLevel.Info);
        let jqueryAjaxSettings: JQueryAjaxSettings = {
            contentType: ajaxRequestParams.contentType,
            url: ajaxRequestParams.url,
            type: (ajaxRequestParams.isGet ? 'GET' : 'POST'),
            headers: ajaxRequestParams.headers,//{'Accept': 'application/json;odata=verbose'},
            success: function (data, textStatus, jqXHR) {
                log('Successful return during processing request to ' + ajaxRequestParams.url, true, LogLevel.Info);
                if (typeof ajaxRequestParams.successHandler === 'function') {
                    ajaxRequestParams.successHandler(data, textStatus, jqXHR);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                log('Error return during processing request to ' + ajaxRequestParams.url, false, LogLevel.Warning);
                if (typeof ajaxRequestParams.errorHandler === 'function') {
                    ajaxRequestParams.errorHandler(jqXHR, textStatus, errorThrown);
                }
            },
            complete: function (jqXHR, textStatus) {
                if (typeof ajaxRequestParams.completehandler === 'function') {
                    ajaxRequestParams.completehandler(jqXHR, textStatus);
                }
                log('Completed processing request to ' + ajaxRequestParams.url, true, LogLevel.Info);
            }
        };
        //Only add data if there is something to add
        if (ajaxRequestParams.data) {
            jqueryAjaxSettings.data = JSON.stringify(ajaxRequestParams.data);
        }
        //Execute ajax request
        $.ajax(jqueryAjaxSettings);
    }
    /**
     * Provides generic Error Handler functionality for jquery Ajax requests. Console logging be default and if in debug mode will throw an alert
     */
    export function genericErrorHandler(jqXHR: JQueryXHR, textStatus: string, errorThrown: string): void {
        log('Error encountered during request processing. ' + errorThrown + ' - ' + textStatus, false, LogLevel.Error);
        if (isDebug) {
            alert('Error encountered during request processing. See Console OPutput' + errorThrown + ' - ' + textStatus, false);
        }
    }
    /**
     * Provides generic Success Handler functionality for jquery Ajax requests. Console logging be default
     */
    export function genericSuccessHandler(data: any, textStatus: string, jqXHR: JQueryXHR): void {
        ArkUtility.log(data, false, LogLevel.Log);
        if (isDebug) {
            ArkUtility.log(textStatus, false, LogLevel.Log);
            ArkUtility.log(jqXHR, false, LogLevel.Log);
        }
    }
    /**
     * Provides empty Handler for any situation
     */
    export function genericEmptyHandler(param1?: any, param2?: any, param3?: any, param4?: any): void {
    }
    /**
     * Provides log Handler for many situations. Can be an Ajax request handler
     */
    export function genericLogHandler(param1?: any, param2?: any, param3?: any, param4?: any): void {
        if (param1) {
            ArkUtility.log(param1, false, LogLevel.Log);
        }
        if (param2) {
            ArkUtility.log(param2, false, LogLevel.Log);
        }
        if (param3) {
            ArkUtility.log(param3, false, LogLevel.Log);
        }
        if (param4) {
            ArkUtility.log(param4, false, LogLevel.Log);
        }
    }
        /**
     * Gets first element by id. Alias document.getElementById(x)
     * @param id
     */
    function getById(id: string): HTMLElement {
        return document.getElementById(id);
    }
    /**
     * Gets a node list of elements by name. Alias document.getElementsByName(x)
     * @param name
     */
    function getByName(name: string): NodeListOf<Element> {
        return document.getElementsByName(name);
    }
    /**
     * Gets a node list of elements by name. Alias document.getElementsByClassName(x)
     * @param name
     */
    function getByClassName(name: string): NodeListOf<Element> {
        return document.getElementsByClassName(name);
    }
    function getId(id) {
        return document.getElementById(id);
    }
    //log('Test Log', false, LogLevel.Info);//uncomment this line if you neeed to see output
    /** Enumeration to specify the impact of the log function */
    export enum LogLevel { Log, Info, Warning, Error }
}
