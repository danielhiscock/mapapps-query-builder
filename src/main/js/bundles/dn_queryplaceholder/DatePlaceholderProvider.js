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
    "dojo/date/locale"
], function (
        declare,
        d_locale
        ) {
    return declare([], {
        getPlaceholder: function () {
            var dateObj = new Date();
            var date = d_locale.format(dateObj, {datePattern: "yyyy-MM-dd", selector: 'date'});
            var time = d_locale.format(dateObj, {datePattern: "HH:mm:ss", selector: 'date'});
            var placeholder = {};
            placeholder["current_date"] = date;
            placeholder["current_time"] = time;
            return placeholder;
        },
        reEvaluate: function () {
            return this.getPlaceholder();
        }
    });
});