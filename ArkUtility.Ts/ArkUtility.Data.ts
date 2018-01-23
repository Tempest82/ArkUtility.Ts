/* Copyright 2018 Sean Jordan
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/* Typedefs have been modified to permit TypeScript 1.8 compiling due to local requirements not yet permitting TypeScript v2+. Upon upgrade re-download typedefs for chart.js and jquery */
/// <reference path="typedefs/reference.ts"/>
/** A selction of utilities which are fairly independant of any third party dependancies. All dependancies should be annotated.  */
namespace ArkUtility {
    /**
     * Data utility methods 
     */
    export namespace Data {
        /**
         * Aquire blob data from a fully qualified url and operate on it using the callback
         * @param dataUrl - Fully qualified url of the data
         * @param callback - Function(blob) to handle the blobData
         */
        export function fetchDataFromUrlAsync(dataUrl: string, callback: (blob: any) => void): void {
            if (dataUrl.substring(0, 4) != 'http')
                return;
            let getDataRequest = new XMLHttpRequest();
            getDataRequest.open('GET', dataUrl, true);
            getDataRequest.responseType = 'arraybuffer';
            getDataRequest.onload = function (e) {
                if (this.status == 200) {
                    let blob = this.response;
                    if (callback) {
                        callback(blob);
                    }
                }
            };
            getDataRequest.send();
        }
        /**
         * Convert a blob to Base64 encoded string
         * @param blob - data blob
         */
        export function getBase64DataFromBlob(blob: any): string {
            if (!blob)
                return;
            let base64EncodedText = btoa(String.fromCharCode.apply(null, new Uint8Array(blob)));
            return base64EncodedText;
        }
        /**
         * Replace an HTML Img tag source with a data source if it is fully qualified.
         * @param htmlImg - Html Image that has a fully qualified linked src attribute.
         */
        export function replaceHtmlImgSrcWithDataUri(htmlImg: any): void {
            if (htmlImg.src.toLowerCase().substring(0, 4) != 'http')
                return;
            fetchDataFromUrlAsync(htmlImg.src, function (blob: any) {
                let dataPrefix: string = 'data:';
                log('Updating if jpg, jpeg, or png ' + htmlImg.src, true, LogLevel.Info);
                let htmlImgLower: string = htmlImg.src.toLowerCase();
                if (htmlImgLower.substring(htmlImg.src.length - 3) === 'jpg' || htmlImgLower.substring(htmlImg.src.length - 4) === 'jpeg') {
                    dataPrefix += 'image/jpeg;base64,';
                }
                else if (htmlImgLower.substring(htmlImg.src.length - 3) === 'png') {
                    dataPrefix += 'image/png;base64,';
                }
                if (dataPrefix === 'data:')
                    return;
                let base64Data = getBase64DataFromBlob(blob);
                htmlImg.src = dataPrefix + base64Data;
            });

        }
        /**
         * Returns a string that should have most/all HTML content removed
         * @param text - Text to be replaced
         */
        export function stripHtmlFromString(text: string): string {
            text = (text ? text.replace(/<!--[\s\S]*?-->/g, '') : '')
            text = text.replace(/<[\s\S]*?>/g, ' ');
            text = text.replace(/\s+/g, ' ').replace(/\t+/g, ' ');
            return text;
        }
    }
}
