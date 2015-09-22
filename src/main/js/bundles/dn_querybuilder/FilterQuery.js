/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "ct/store/Filter",
    "./EditableQueryBuilderWidget"
], function (declare, Filter, EditableQueryBuilderWidget) {
    return declare([], {
        // Surrounds a store with a Filter and fires a selection end event
        // If the result center is part of the app the store would be shown there
        // TODO: better integrate the filter code inside the SearchStoreTool of the result center?
        onFilterStoreClicked: function (event) {
            var store = event.store;
            if (!store) {
                // ignore
                return;
            }
            var customquery = event.customquery;
            var topic = "ct/selection/SELECTION_END";
            if (event.options.editable === true) {
                var props = event._properties;
                var i18n = event._i18n.get();
                var tool = event.tool;
                var store = event.store;
                var mapState = this._mapState;
                var dataModel = this._dataModel;
                var replacer = this._replacer;
                var widget = this.widget = new EditableQueryBuilderWidget({
                    properties: props,
                    i18n: i18n.wizard,
                    tool: tool,
                    store: store,
                    mapState: mapState,
                    dataModel: dataModel,
                    replacer: replacer
                });
                var window = this._windowManager.createWindow({
                    title: i18n.wizard.editWindowTitle,
                    marginBox: {
                        w: 540,
                        h: 360,
                        t: 100,
                        l: 20
                    },
                    content: widget,
                    closable: true,
                    resizable: false
                });
                window.show();
            } else {
                var options = {};
                options.count = event.options.count;
                options.ignoreCase = event.options.ignoreCase;
                options.locale = event.options.locale;
                this._eventService.postEvent(topic, {
                    source: this,
                    store: customquery ? Filter(store, customquery, options) : store
                });
            }
        }
    });
});
