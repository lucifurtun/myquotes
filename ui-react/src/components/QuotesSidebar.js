import React from 'react'
import { FaPlus } from 'react-icons/fa'

const Sidebar = () => (
    <div>
        <div className="panel panel-info">
            <div className="panel-heading">
                <h3 className="panel-title" data-target="#categories-filter-body" aria-expanded="true"
                    data-toggle="collapse">
                    Categories</h3>
                <a className='pull-right' href="" ng-click="setFilterType('categories')" ng-if="!readOnly">
                    <FaPlus/>
                </a>
            </div>
            <div className="body-wrapper collapse" ng-class="{in: desktopView}" id="categories-filter-body">
                <div className="panel-body">
                    {/*<filter items="categories" type="categories" className="filter filter-categories"></filter>*/}
                </div>
            </div>
        </div>

        <div className=" panel panel-danger">
            <div className="panel-heading">
                <h3 className="panel-title" data-target="#authors-filter-body" data-toggle="collapse">Authors</h3>
                <a className='pull-right' href="" ng-click="setFilterType('authors')" ng-if="!readOnly">
                    <FaPlus/>
                </a>
            </div>
            <div className="body-wrapper collapse" ng-class="{in: desktopView}" id="authors-filter-body">
                <div className="panel-body">
                    {/*<filter items="authors" type="authors" className="filter filter-authors"></filter>*/}
                </div>
            </div>
        </div>

        <div className="panel panel-info">
            <div className="panel-heading">
                <h3 className="panel-title" data-target="#tags-filter-body" data-toggle="collapse">Tags</h3>
                <a className='pull-right' href="" ng-click="setFilterType('tags')" ng-if="!readOnly">
                    <FaPlus/>
                </a>
            </div>
            <div className="body-wrapper collapse" ng-class="{in: desktopView}" id="tags-filter-body">
                <div className="panel-body">
                    {/*<filter items="tags" type="tags" className="filter filter-tags"></filter>*/}
                </div>
            </div>
        </div>
    </div>
)

export default Sidebar
