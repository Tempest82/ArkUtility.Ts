Copyright 2018 Sean Jordan
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