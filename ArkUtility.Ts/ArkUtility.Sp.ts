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
     * Sharepoint Utility Methods -  A selection of utilities for SharePoint a few requiring jQuery are annotated. Written for SharePoint 2013.
     */
    export namespace Sp {
        /**
         * Name of the current page user. May be set by using the setCurrentPageUserAsync method or direct assignment.
         */
        export let currentPageUser: string = '';
        export function ajaxSpRequestBasic(isGet: boolean, refreshDigest: boolean, apiUrl: string, ajaxRequestHandlers: AjaxRequestHandlers, data?: any) {
            let headers: any = {
                'Accept': 'application/json;odata=verbose'
            };
            if (refreshDigest) {
                updateRequestDigestSync();
            }
            if (!isGet) {
                headers = {
                    'Accept': 'application/json;odata=verbose',
                    'content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': (document.getElementById('__REQUESTDIGEST') ? (document.getElementById('__REQUESTDIGEST') as HTMLInputElement).value : '')
                };
            }
            let ajaxRequestParams = new ArkUtility.AjaxRequestParams();
            ajaxRequestParams.contentType = 'application/json';
            ajaxRequestParams.url = apiUrl;
            ajaxRequestParams.isGet = true;
            ajaxRequestParams.headers = headers;
            if (data) {
                ajaxRequestParams.data = data;
            }
            ajaxRequestParams.successHandler = ajaxRequestHandlers.successHandler;
            ajaxRequestParams.errorHandler = ajaxRequestHandlers.errorHandler;
            ajaxRequestParams.completehandler = ajaxRequestHandlers.completehandler;
            ArkUtility.ajaxRequest(ajaxRequestParams);
        }
        /**
         * Get javascript day from SharePoint Date
         * @param spDate - A Sharepoint Date field's data for example Modified or Created dates.
         */
        export function getJsDateFromSpDate(spDate: any): Date {
            if (spDate.toString().indexOf(' ') === -1 && spDate.toString().indexOf('T') > -1) {
                //if SP JSON formatted Date is retrieved return the date object gracefully.
                return new Date(spDate);
            }
            let dateParts: any = spDate.split(' ')[0];
            let timeParts: any = spDate.split(' ')[1];
            let jsHour = 0;
            let jsMin = 0;
            let jsSec = 0;
            if (timeParts !== undefined) {
                timeParts = timeParts.split(':');
                if (timeParts !== undefined) {
                    jsHour = timeParts[0];
                    jsMin = timeParts[1];
                    jsSec = timeParts[2];
                }
            }
            dateParts = dateParts.split('-');
            let jsYear = dateParts[0];
            let jsMonth = dateParts[1];
            let jsDay = dateParts[2];
            if (jsDay.toString().indexOf('T') > -1) {
                //fix a date format returned with an T instead of a space
                jsDay = jsDay.substring(0, jsDay.toString().indexOf('T'));
            }
            let newDate = new Date(jsYear, jsMonth - 1, jsDay, jsHour, jsMin, jsSec);
            return newDate;
        }

        /**
         * Convert a Sharepoint Date to a readable date format
         * @param spDate - A Sharepoint Date field's data for example Modified or Created dates.
         */
        export function spDateToText(spDate: any): string {
            let year = spDate.getFullYear();
            let month = spDate.getMonth();
            let day = addZero(spDate.getDay());
            return day + '-' + monthAbbreviations[month] + '-' + year.toString();
        }
        /**
         * Get numerical day of the week
         * @param spDate - A Sharepoint Date field's data for example Modified or Created dates.
         */
        export function getDayOfWeek(spDate: any): number {
            let dateParts = spDate.split("-");
            let year = dateParts[0];
            let month = dateParts[1];
            let day = dateParts[2];
            let newDate = new Date(year, month - 1, day);
            return newDate.getUTCDay();
        }

        /**
         * Get numerical month
         * @param spDate - A Sharepoint Date field's data for example Modified or Created dates.
         */
        export function getMonth(spDate: any): number {
            let dateParts = spDate.split("-");
            let month = dateParts[1];
            return month - 1;
        }
        /**
         * Sets the ArkUtility.Sp.currentPageUser value.
         * @param userId
         * @param spWebServerRelativeUrl - Optional. Allows override of declared sharepoint context server.
         */
        export function setCurrentPageUserAsync(userId?: string, spWebServerRelativeUrl?: any) {
            let spUserId = userId || (window as any)._spPageContextInfo.userId;
            let userInfoApiUrl = buildSpRootApiUrl('/_api/web/getUserById(' + spUserId + ')', spWebServerRelativeUrl);
            let ajaxRequestHandlers = new BasicAjaxRequestHandlers();
            ajaxRequestHandlers.successHandler = function (data: any, textStatus: string, jqXHR: JQueryXHR) {
                currentPageUser = data.d.Title;
                log('Found User: ' + currentPageUser, true, LogLevel.Info);
            };
            ajaxRequestHandlers.errorHandler = genericErrorHandler;
            ajaxSpRequestBasic(true, false, userInfoApiUrl, ajaxRequestHandlers);
        }
        /**
         * Delays a function execution until after a specified script is loaded
         * @param delayedFunctionName - Name of the function to call after the specified script has loaded
         * @param scriptToWaitOn - Name of the file to wait for. for example: 'SP.js'
         * @param retryAttempts - Number of times the system will wait for window.ExecuteOrDelayUntilScriptLoaded(SharePoint init.js function) is available in memory, retrying every 300ms
         */
        export function executeFunctionAfterScriptLoaded(delayedFunctionName: any, scriptToWaitOn: string, retryAttempts: number) {
            if (undefined !== (typeof (window as any).ExecuteOrDelayUntilScriptLoaded)) {
                (window as any).ExecuteOrDelayUntilScriptLoaded(delayedFunctionName, scriptToWaitOn);
            }
            else {
                if (retryAttempts > 0) {
                    setTimeout(function () {
                        executeFunctionAfterScriptLoaded(delayedFunctionName, scriptToWaitOn, (--retryAttempts));
                    }, 300);
                }
            }
        }
        /**
         * Update __REQUESTDIGEST synchronously. Requires init.js to be loaded
         */
        export function updateRequestDigestSync(): void {
            if (typeof (window as any).UpdateFormDigest === 'function') {
                (window as any).UpdateFormDigest((window as any)._spPageContextInfo.webServerRelativeUrl, (window as any)._spFormDigestRefreshInterval);
            }
            else {
                log('Invalid use of updateRequestDigestSync(). window.UpdateFormDigest() from init.js is not loaded', false, LogLevel.Warning)
                throw 'Unable to update __REQUESTDIGEST. Missing SharePoint Javascript Function. Ensure init.js is loaded or use another method.'
            }
        }
        /**
         * Update __REQUESTDIGEST synchronously
         * @param spWebServerRelativeUrl - Optional. Allows override of declared sharepoint context server.
         */
        export function updateRequestDigestAsync(spWebServerRelativeUrl?: any): void {
            let contextInfoApiUrl: string = buildSpRootApiUrl('/_api/contextinfo', spWebServerRelativeUrl);
            let ajaxRequestHandlers = new BasicAjaxRequestHandlers();
            ajaxRequestHandlers.successHandler = updateRequestDigestSuccessHandler;
            ajaxRequestHandlers.errorHandler = genericErrorHandler;
            ajaxSpRequestBasic(false, false, contextInfoApiUrl, ajaxRequestHandlers);
        }
        /**
       *  Updates $('#__REQUESTDIGEST').val() based on jquery Ajax request response.
       */
        function updateRequestDigestSuccessHandler(data: any, textStatus: string, jqXHR: JQueryXHR): void {
            if (document.getElementById('__REQUESTDIGEST')) {
                //$('#__REQUESTDIGEST').val(data.d.GetContextWebInformation.FormDigestValue);
                (document.getElementById('__REQUESTDIGEST') as HTMLInputElement).value = data.d.GetContextWebInformation.FormDigestValue;
                log('Updated __REQUESTDIGEST value', true, LogLevel.Info);
            }
            else {
                log('Failed to update __REQUESTDIGEST value. HTML element with Id "__REQUESTDIGEST" not found.', true, LogLevel.Error);
            }
        }

        /**
         * Gets list from SharePoint Rest Api. Success data.d has the information.
         * @param listGuid - Sharepoint Guid for this list
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpList(listGuid: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, listApiUrl, ajaxRequestHandlers);
        }
        /**
         * Gets list fields from SharePoint Rest Api. Success data.d.results has the information.
         * @param listGuid - Sharepoint Guid for this list
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListFields(listGuid: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/Fields', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, listApiUrl, ajaxRequestHandlers);
        }
        /**
         * Gets list related fields from SharePoint Rest Api. Success data.d.results has the information.
         * @param listGuid - Sharepoint Guid for this list
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListRelatedFields(listGuid: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/getRelatedFields', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, listApiUrl, ajaxRequestHandlers);
        }
        /**
         * Gets list content types from SharePoint Rest Api. Success data.d.results has the information.
         * Useful fields: data.d.results.[i].Id.StringValue and data.d.results.[i].Name
         * @param listGuid - Sharepoint Guid for this list
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListContentTypes(listGuid: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/ContentTypes', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, listApiUrl, ajaxRequestHandlers);
        }
        /**
         * Gets list views from SharePoint Rest Api. Success data.d has the information.
         * @param listGuid - Sharepoint Guid for this list
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListViews(listGuid: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/Views', spWebServerRelativeUrl);
            ajaxSpRequestBasic(false, true, listApiUrl, ajaxRequestHandlers);
        }
        /**
         * Gets list views Items from SharePoint Rest Api. Data.d.ListViewXml has the CAML for this view Success data.d has the information.
         * @param listGuid - Sharepoint Guid for this list
         * @param viewId - list view Id to pull information from 
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListView(listGuid: string, viewId: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/Views(\'' + viewId + '\')', spWebServerRelativeUrl);
            ajaxSpRequestBasic(false, true, listApiUrl, ajaxRequestHandlers);
        }

        /**
         * Gets list from SharePoint Rest Api by Title. Return contains details such as guid etc.
         * @param listGuid - Sharepoint Guid for this list
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListByName(listName: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists/getByTitle(\'' + listName + '\')', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, listApiUrl, ajaxRequestHandlers);
        }
        /**
         *  Gets list item from SharePoint Rest Api. Success data.d has the information.
         * @param listGuid
         * @param itemId
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListItem(listGuid: string, itemId: string | number, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/getitembyid(' + itemId.toString() + ')', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, true, listApiUrl, ajaxRequestHandlers);
        }
        /**
         * Gets list items based on a specified query from SharePoint Rest Api. 
         * @param listGuid - Sharepoint Guid for this list
         * @param camlQuery - CAML to sort/filter this list ex: '<View></View>'
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getSpListItems(listGuid: string, camlQuery: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/Items', spWebServerRelativeUrl);
            if (!camlQuery) {
                camlQuery = '<View></View>';
            }
            let data = {
                query: {
                    __metadata: {
                        type: 'SP.CamlQuery'
                    }, ViewXml: camlQuery
                }
            };
            ajaxSpRequestBasic(false, true, listApiUrl, ajaxRequestHandlers, data);
        }
        /**
         * Add Item to Sharepoint List 
         * @param listGuid - Sharepoint Guid for this list
         * @param entryData
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function addSpListItem(listGuid: string, entryData: any, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/items', spWebServerRelativeUrl);
            ajaxSpRequestBasic(false, true, listApiUrl, ajaxRequestHandlers, entryData);
        }
        export function recycleSpListItem(listGuid: string, itemId: string | number, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/items(' + itemId.toString() + ')/recycle', spWebServerRelativeUrl);
            ajaxSpRequestBasic(false, true, listApiUrl, ajaxRequestHandlers);
        }
        export let deleteSpListItem = recycleSpListItem;
        /**
         * Gets the user details available in data.d
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param userId - Optional. Defaults to current user
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getUser(ajaxRequestHandlers: AjaxRequestHandlers, userId?: string | number, spWebServerRelativeUrl?: any) {
            let spUserId = userId || (window as any)._spPageContextInfo.userId;
            let userInfoApiUrl = buildSpRootApiUrl('/_api/web/getUserById(' + spUserId + ')', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, userInfoApiUrl, ajaxRequestHandlers);
        }
        /**
        * Gets the user group details available in data.d
        * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
        * @param userId - Optional. Defaults to current user
        * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
        */
        export function getUserGroups(ajaxRequestHandlers: AjaxRequestHandlers, userId?: string | number, spWebServerRelativeUrl?: any) {
            let spUserId = userId || (window as any)._spPageContextInfo.userId;
            let userInfoApiUrl = buildSpRootApiUrl('/_api/web/getUserById(' + spUserId + ')/Groups', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, userInfoApiUrl, ajaxRequestHandlers);
        }
        /**
         * Gets the user group details available in data.d. This will fail if not an admin user
         * @param ajaxRequestHandlers - Facilitates handling Ajax returns. One implementation is ajaxRequestHandlers = new BasicAjaxRequestHandlers();
         * @param spWebServerRelativeUrl - Optional. Overrides source server portion of api path
         */
        export function getAllSiteGroups(ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let userInfoApiUrl = buildSpRootApiUrl('/_api/web/sitegroups', spWebServerRelativeUrl);
            ajaxSpRequestBasic(true, false, userInfoApiUrl, ajaxRequestHandlers);
        }
        /**
         * Provides an invisible image to the webpage at regular intervals to maintian the web connection. Requires Jquery and SharePoint Javascript objects.
         * @param interval - Milliseconds to wait between keepalive interval
         */
        function keepAlive(interval?: number) {
            setInterval(function () {
                $('body').append('<img src="/_layouts/15/images/blank.gif?v=' + Date.now() + '" style="display:none;" />');
            }, interval || 240000);
        }
        export function openModalDialog(title: string, url: string, callback?: any, width?: number, height?: number) {
            var options = {
                url: url,
                title: title,
                allowMaximize: true,
                showClose: true,
                width: width || 1000,
                height: height || 1000,
                dialogReturnValueCallback: (typeof callback === 'function' ? callback : genericEmptyHandler)
            };
            (window as any).SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
        }
        export function notificationCallback(dialogResult: any, returnValue: string) {
            if (dialogResult == (window as any).SP.UI.DialogResult.OK) {
                (window as any).SP.UI.Notify.addNotification('The operation was successful...' + returnValue, false);
            }
            else {
                (window as any).SP.UI.Notify.addNotification('The operation was cancelled...', false);
            }
        }

        /**
         * Builds a path using (spWebServerRelativeUrl || _spPageContextInfo.webAbsoluteUrl || location.protocol + '//' + location.host )+ apiPath
         * @param apiPath - Start with slash
         * @param spWebServerRelativeUrl - overrides source server portion of api path
         */
        export function buildSpRootApiUrl(apiPath: string, spWebServerRelativeUrl?: any): string {
            let apiUrl: string;
            if (spWebServerRelativeUrl) {
                apiUrl = spWebServerRelativeUrl;
            } else if (typeof (window as any)._spPageContextInfo === 'object' && typeof (window as any)._spPageContextInfo.webAbsoluteUrl != 'undefined') {
                apiUrl = (window as any)._spPageContextInfo.webAbsoluteUrl;
            }
            else {
                apiUrl = location.protocol + '//' + location.host;
            }
            apiUrl += apiPath;
            return apiUrl;
        }
        /**
         * Dialog Utility Methods
         */
        export namespace Dialog {
            /**
             * Updates a SP dialog through a series of onclick events to alter the upload selected library to a specified option
             * @param {string[]} pageNamesToAffect - Page name(s) to hunt for when reviewing iframe source 
             * @param  {string[]} richTextFieldsToUpdate - Html Ids of the rich text field(s) which should be updated.
             * @param libraryToSelect - GUID of the library which must be 
             * @param removeOtherLibraries - Determines if the library once set should remain the only viable option in the select list by removing all other options.
             * @param maxTries - Maximum number of tries to see if the iframe has loaded into the browser. 1 try is executed about every 300ms. Default 90.
             */
            export function limitDialogRtfImageUploadLibrary(pageNamesToAffect: string[], richTextFieldsToUpdate: string[], libraryToSelect: string, removeOtherLibraries: boolean, maxTries?: number): void {
                maxTries = maxTries || 90;
                /** Update the pageNamesToAffect to lowercase for future case insensitive comparisons*/
                for (let i of pageNamesToAffect) { i = i.toLowerCase(); }
                for (let i of richTextFieldsToUpdate) {
                    if (i.indexOf('#') != 0) {
                        i = '#' + i;
                    }
                }
                limitDialogRtfImageUploadLibraryStep2(pageNamesToAffect, richTextFieldsToUpdate, libraryToSelect, removeOtherLibraries, 90);
            }
            /**
             * Find the Iframe to act against. if not found keep searching about every 300ms. Requires Jquery.
             * @param  {string[]} pageNamesToAffect - Page name(s) to hunt for when reviewing iframe source
             * @param  {string[]} richTextFieldToUpdate - Html Ids of the rich text field(s) which should be updated.
             * @param libraryToSelect - GUID of the library which must be
             * @param removeOtherLibraries - Determines if the library once set should remain the only viable option in the select list by removing all other options.
             * @param maxTries - Maximum number of tries to see if the iframe has loaded into the browser. 1 try is executed about every 300ms
             */
            function limitDialogRtfImageUploadLibraryStep2(pageNamesToAffect: string[], richTextFieldsToUpdate: string[], libraryToSelect: string, removeOtherLibraries: boolean, maxTries: number): void {
                setTimeout(function () {
                    let foundTargetIframe = false;
                    $(document).find('iframe').each(function () {
                        let pageUrl: string = this.src.toLowerCase();
                        for (let i of pageNamesToAffect) {
                            if (pageUrl.indexOf(i) !== -1) {
                                foundTargetIframe = true;
                                break;
                            };
                        }
                        if (foundTargetIframe) {
                            let iframeContentWindow = this.contentWindow;
                            limitDialogRtfImageUploadLibraryStep3(iframeContentWindow, richTextFieldsToUpdate, libraryToSelect, removeOtherLibraries);
                        }
                    });
                    if (!foundTargetIframe) {
                        limitDialogRtfImageUploadLibraryStep2(pageNamesToAffect, richTextFieldsToUpdate, libraryToSelect, removeOtherLibraries, --maxTries);
                    }
                }, 300);
            }
            /**
             * Using the Iframe, if jquery has loaded in the iframe update the text field(s) to update the ribbon once clicked. Requires Jquery.
             * @param contentWindow - relevant iframe content window
             * @param  {string[]} richTextFieldToUpdate - Html Ids of the rich text field(s) which should be updated.
             * @param libraryToSelect - GUID of the library which must be
             * @param removeOtherLibraries - Determines if the library once set should remain the only viable option in the select list by removing all other options.
             */
            function limitDialogRtfImageUploadLibraryStep3(contentWindow: any, richTextFieldsToUpdate: string[], libraryToSelect: string, removeOtherLibraries: boolean): void {
                setTimeout(function () {
                    let hasUpdatedFields = false;
                    if (typeof contentWindow.$ !== 'undefined') {
                        for (let i of richTextFieldsToUpdate) {
                            if (contentWindow.$(i).length > 0) {
                                ensureOnClickAttr(contentWindow.$(i));
                                /** Add jquery onClick */
                                contentWindow.$(i).on('click', function () {
                                    limitDialogRtfImageUploadLibraryStep4(contentWindow, libraryToSelect, removeOtherLibraries);
                                });
                            }
                        }
                    }
                    else {
                        limitDialogRtfImageUploadLibraryStep3(contentWindow, richTextFieldsToUpdate, libraryToSelect, removeOtherLibraries);
                    }
                }, 300);
            }
            /**
             * Update the ribbon insert tab with an event to update the image button once clicked. Requires Jquery.
             * @param contentWindow - relevant iframe content window
             * @param libraryToSelect - GUID of the library which must be
             * @param removeOtherLibraries - Determines if the library once set should remain the only viable option in the select list by removing all other options.
             */
            function limitDialogRtfImageUploadLibraryStep4(contentWindow: any, libraryToSelect: string, removeOtherLibraries: boolean): void {
                setTimeout(function () {
                    let ribbonInsertTabId = '#Ribbon\\.EditingTools\\.CPInsert-title';
                    if (contentWindow.$(ribbonInsertTabId).length > 0) {
                        ensureOnClickAttr(contentWindow.$(ribbonInsertTabId));
                        /** Add jquery onClick */
                        contentWindow.$(ribbonInsertTabId).on('click', function () {
                            limitDialogRtfImageUploadLibraryStep5(contentWindow, libraryToSelect, removeOtherLibraries);
                        });
                    }
                    else {
                        limitDialogRtfImageUploadLibraryStep4(contentWindow, libraryToSelect, removeOtherLibraries);
                    }
                }, 300);

            }
            /**
             * Update the image button with an event to update the from computer menu link once clicked. Requires Jquery.
             * @param contentWindow - relevant iframe content window
             * @param libraryToSelect - GUID of the library which must be
             * @param removeOtherLibraries - Determines if the library once set should remain the only viable option in the select list by removing all other options.
             */
            function limitDialogRtfImageUploadLibraryStep5(contentWindow: any, libraryToSelect: string, removeOtherLibraries: boolean): void {
                setTimeout(function () {
                    let ribbonImagesButton = '#Ribbon\\.EditingTools\\.CPInsert\\.Media\\.Image-Large';
                    if (contentWindow.$(ribbonImagesButton).length > 0) {
                        ensureOnClickAttr(contentWindow.$(ribbonImagesButton))
                        /** Add jquery onClick */
                        contentWindow.$(ribbonImagesButton).on('click', function () {
                            limitDialogRtfImageUploadLibraryStep6(contentWindow, libraryToSelect, removeOtherLibraries);
                        });
                    }
                    else {
                        limitDialogRtfImageUploadLibraryStep5(contentWindow, libraryToSelect, removeOtherLibraries);
                    }
                }, 300);

            }
            /**
             * Update the 'from computer' link to update the subsequent upload dialog once clicked. Requires Jquery.
             * @param contentWindow - relevant iframe content window
             * @param libraryToSelect - GUID of the library which must be
             * @param removeOtherLibraries - Determines if the library once set should remain the only viable option in the select list by removing all other options.
             */
            function limitDialogRtfImageUploadLibraryStep6(contentWindow: any, libraryToSelect: string, removeOtherLibraries: boolean): void {
                setTimeout(function () {
                    let ribbonImagesFromComputerItem = '#Ribbon\\.EditingTools\\.CPInsert\\.Media\\.Image\\.Menu\\.Image\\.FromComputer-Menu';
                    if (contentWindow.$(ribbonImagesFromComputerItem).length > 0) {
                        ensureOnClickAttr(contentWindow.$(ribbonImagesFromComputerItem));
                        /** Add jquery onClick */
                        contentWindow.$(ribbonImagesFromComputerItem).on('click', function () {
                            limitDialogRtfImageUploadLibraryStep7(libraryToSelect, removeOtherLibraries);
                        });
                    }
                    else {
                        limitDialogRtfImageUploadLibraryStep6(contentWindow, libraryToSelect, removeOtherLibraries);
                    }
                }, 300);

            }
            /**
             * Update the upload dialog to the selected library options. Requires Jquery.
             * @param libraryToSelect - GUID of the library which must be
             * @param removeOtherLibraries - Determines if the library once set should remain the only viable option in the select list by removing all other options.
             */
            function limitDialogRtfImageUploadLibraryStep7(libraryToSelect: string, removeOtherLibraries: boolean): void {
                setTimeout(function () {
                    let foundSelectBox = false;
                    let parentDoc = parent.document;
                    let availableDocLibraryName = 'ctl00$PlaceHolderMain$SelectListSection$ctl01$AvailableDocLibs';
                    $(parentDoc).find('iframe').each(function () {
                        $(this).contents().find('select').each(function () {
                            if (this.name == availableDocLibraryName) {
                                foundSelectBox = true;
                                $(this).val(libraryToSelect);
                                if (removeOtherLibraries) {
                                    for (let i = this.options.length - 1; i >= 0; i--) {
                                        if (!this.options[i].selected) { this.remove; }
                                    }
                                }

                            }
                        });
                    });
                    if (!foundSelectBox) {
                        limitDialogRtfImageUploadLibraryStep7(libraryToSelect, removeOtherLibraries);
                    }
                }, 300);

            }
        }
    }

}
