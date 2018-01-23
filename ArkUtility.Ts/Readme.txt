Copyright 2018 Sean Jordan
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

-------------------------------------------------------------------------------------------

Release v1.2

This is a baseline TypeScript Project designed for TypeScript v1.8x. 

This project will transcompile JS files based on the project properties for TypeScript Build. IE 10 target requires ECMASCRIPT 5 and ES 2015 for proper .js file creation.

This is designed as a utility project that can be used to start a project rapidly. The intent is that your custom app logic would remain separate and that these utility
file can be built upon and upgraded in place at all locations without breaking any systems.


Technical data:
The typedefs have been modified to work with TypseScript1.8 
 

//JavaScript Tests
//------------
//----------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpListByName('Documents', ajaxRequestHandlers )//Change this list name
//----------
var listGuid = 'db5e13a2-dafc-4530-b7e7-b1beaf072375'; //Change this list Guid
//----------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpList(listGuid , ajaxRequestHandlers )
//----------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpListItems(listGuid,null, ajaxRequestHandlers )
//----------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpListViews(listGuid, ajaxRequestHandlers )
//----------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
var spUserId = null;
Utility.SP.getUser(ajaxRequestHandlers,spUserId  )

//----------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpListView(listGuid, 'd8095beb-ef28-4f49-b843-b643795ddac5', ajaxRequestHandlers )
//-----------------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpListFields(listGuid, ajaxRequestHandlers )
//-----------------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpListRelatedFields(listGuid, ajaxRequestHandlers )
//-----------------
var ajaxRequestHandlers = new Utility.BasicAjaxRequestHandlers();
ajaxRequestHandlers.successHandler = Utility.genericSuccessHandler;
Utility.SP.getSpListContentTypes(listGuid, ajaxRequestHandlers )
//-----------------


export function getSpListViews(listGuid: string, ajaxRequestHandlers: AjaxRequestHandlers, spWebServerRelativeUrl?: any) {
            let listApiUrl: string = buildSpRootApiUrl('/_api/web/lists(guid\'' + listGuid + '\')/Views', spWebServerRelativeUrl);
            ajaxSpRequestBasic(false, true, listApiUrl, ajaxRequestHandlers);
        }
