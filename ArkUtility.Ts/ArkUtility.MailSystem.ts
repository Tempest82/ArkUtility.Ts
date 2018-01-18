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
/// <reference path="ArkUtility.ts"/>
/// <reference path="ArkUtility.Sp.ts"/>
/** A selction of utilities which are fairly independant of any third party dependancies. All dependancies should be annotated.  */
namespace ArkUtility {
    /**
    * Designed to work with built in SharePoint email OR ArkUtility.SPMail a C# on premise farm scoped solution.
    * Many methods require SP.js, jQuery, and sp.runtime.js
    */
    namespace MailSystem {
        export interface Mailing {
            send: (successHandler?: (data: any, textStatus: string, jqXHR: JQueryXHR) => void,
                errorHandler?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void,
                completehandler?: (jqXHR: JQueryXHR, textStatus: string) => void) => void;
        }

        interface SharePointApiMail {
            from: string;
            /**
             * Must all be a valid SharePoint user email address. example ['one@mail.com','two@mail.com']
             */
            to: string[];
            /**
             * Must all be a valid SharePoint user email address. example ['one@mail.com','two@mail.com']
             */
            cc: string[];
            /**
             * Must all be a valid SharePoint user email address. example ['one@mail.com','two@mail.com']
             */
            bcc: string[];
            body: string;
            subject: string;
            getJsonData: () => {};
        }

        /**
         * Only supports valid SharePoint user email addresses.
         * Requires SP.js, jQuery, and sp.untime.js
         */
        export class SpMail implements SharePointApiMail, Mailing {
            from: string;
            /**
             * Only supports valid SharePoint user email address. example ['one@mail.com','two@mail.com']
             */
            to: string[];
            body: string;
            subject: string;
            cc: string[];
            bcc: string[];
            apiMailUrl: string;

            constructor() {
                this.apiMailUrl = location.protocol + '//' + location.host + '/_api/SPUtilities.Utility.SendEmail';
            }

            /**
             * Returns an object of type SP.Utilities.EmailProperties
             */
            getJsonData(): any {
                let jsonMail = {
                    properties: {
                        __metadata: { 'type': 'SP.Utilities.EmailProperties' },
                        From: this.from,
                        To: { 'results': this.to },
                        CC: { 'results': this.cc },
                        BCC: { 'results': this.bcc },
                        Body: this.body || null,
                        Subject: this.subject || '(Blank Subject)'
                    }
                };
                return jsonMail;
            }

            send(successHandler?: (data: any, textStatus: string, jqXHR: JQueryXHR) => void,
                errorHandler?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void,
                completehandler?: (jqXHR: JQueryXHR, textStatus: string) => void): void {
                let basicAjaxRequestHandlers: ArkUtility.AjaxRequestHandlers =
                    new ArkUtility.BasicAjaxRequestHandlers();
                basicAjaxRequestHandlers.successHandler = successHandler;
                basicAjaxRequestHandlers.errorHandler = errorHandler;
                basicAjaxRequestHandlers.completehandler = completehandler;
                ArkUtility.Sp.ajaxSpRequestBasic(false,
                    true,
                    this.apiMailUrl,
                    basicAjaxRequestHandlers,
                    this.getJsonData());
            }
        }

        interface ApiMail {
            userFrom: string;
            userTo: string;
            userCc: string;
            userBcc: string;
            body: string;
            bodyClassification: string;
            bodyClassificationWithAttachments: string;
            subject: string;
            subjectClassification: string;
            imageLibraryUrl: string;
            logListUrl: string;
            shouldEmbedImages: boolean;
            shouldWrapBodyWithHtml: boolean;
            apiUrl: string;
        }

        /**
         * Mail uses a custom API that is exposed as part of the ArkUtility.SPMail solution installed on the SharePoint Farm. It is used to send emails outside of the valid sharepoint users as well as to embed images within the email.
         */
        export class Mail implements ApiMail, Mailing {
            userFrom: string;
            userTo: string;
            userCc: string;
            userBcc: string;
            body: string;
            bodyClassification: string;
            bodyClassificationWithAttachments: string;
            subject: string;
            subjectClassification: string;
            imageLibraryUrl: string;
            logListUrl: string;
            shouldEmbedImages: boolean;
            shouldWrapBodyWithHtml: boolean;
            apiUrl: string;
            /**
             * Not Implemented by API yet. Reserved for future use.
            */
            listBodyField: string;
            /**
            * Not Implemented by API yet. Reserved for future use.
           */
            listItem: string;
            /**
            * Not Implemented by API yet. Reserved for future use.
           */
            listSubjectField: string;
            /**
            * Not Implemented by API yet. Reserved for future use.
           */
            listUrl: string;

            constructor() {
                this.userFrom = null;
                this.apiUrl = location.protocol +
                    '//' +
                    location.host +
                    '/_vti_bin/utility.sendmail/sendmailservice.svc/send';
                this.shouldEmbedImages = true;
                this.shouldWrapBodyWithHtml = true;
                this.listBodyField = null;
                this.listItem = null;
                this.listSubjectField = null;
                this.listUrl = null;
            }

            addFromAddress(email: string, displayName: string): void {
                if (typeof this.userFrom === 'undefined' || this.userTo === null)
                    this.userFrom = '';
                this.userFrom = '\"' + (displayName || email) + '\" <' + email + '>';
            }

            addToAddress(email: string, displayName: string): void {
                if (typeof this.userTo === 'undefined' || this.userTo === null)
                    this.userTo = '';
                if (this.userTo.length > 0) {
                    this.userTo += ', ';
                }
                this.userTo += '\"' + (displayName || email) + '\" <' + email + '>';
            }

            addCcAddress(email: string, displayName: string): void {
                if (typeof this.userCc === 'undefined' || this.userCc === null)
                    this.userCc = '';
                if (this.userCc.length > 0) {
                    this.userCc += ', ';
                }
                this.userCc += '\"' + (displayName || email) + '\" <' + email + '>';
            }

            addBccAddress(email: string, displayName: string): void {
                if (typeof this.userBcc === 'undefined' || this.userBcc === null)
                    this.userBcc = '';
                if (this.userBcc.length > 0) {
                    this.userBcc += ', ';
                }
                this.userBcc += '\"' + (displayName || email) + '\" <' + email + '>';
            }

            getJsonData(): any {
                let jsonMail = {
                    From: this.userFrom || null,
                    To: this.userTo || null,
                    Cc: this.userCc || null,
                    Bcc: this.userBcc || null,
                    ClassificationBody: this.bodyClassification || null,
                    ClassificationBodyWithAttachments: this.bodyClassificationWithAttachments || null,
                    ClassificationSubject: this.subjectClassification || null,
                    MessageSubject: this.subject || '(Blank Subject)',
                    MessageBody: this.body || null,
                    ImageLibraryUrl: this.imageLibraryUrl || null,
                    LogListUrl: this.logListUrl || null,
                    ListBodyField: this.listBodyField || null,
                    ListItem: this.listItem || null,
                    ListSubjectField: this.listSubjectField || null,
                    ListUrl: this.listUrl || null,
                    ShouldEmbedImages: this.shouldEmbedImages,
                    ShouldWrapBodyWithHtml: this.shouldWrapBodyWithHtml
                };
                return jsonMail;
            }

            send(successHandler?: (data: any, textStatus: string, jqXHR: JQueryXHR) => void,
                errorHandler?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void,
                completehandler?: (jqXHR: JQueryXHR, textStatus: string) => void): void {
                let basicAjaxRequestHandlers: ArkUtility.AjaxRequestHandlers =
                    new ArkUtility.BasicAjaxRequestHandlers();
                basicAjaxRequestHandlers.successHandler = successHandler;
                basicAjaxRequestHandlers.errorHandler = errorHandler;
                basicAjaxRequestHandlers.completehandler = completehandler;
                ArkUtility.Sp.ajaxSpRequestBasic(false,
                    true,
                    this.apiUrl,
                    basicAjaxRequestHandlers,
                    this.getJsonData());
            }
        }
    }
}