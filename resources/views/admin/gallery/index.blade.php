<!-- flash message -->
<flash-message></flash-message>

<!-- Confirm delete modal -->
<div delete-modal ng-if="vm.deleteModal" cancel="vm.hideDeleteModal()" delete="vm.deleteGallery(gallery)"></div>

<div class="row">
    <!-- main heading -->
    <div class="col-lg-12">
        <h3 class="page-header">Gallery</h3>
        <page-loading ng-show="!vm.ready"></page-loading>
    </div>
</div>

<div class="row" ng-show="vm.ready">
    <div class="col-lg-12">
        <div class="panel panel-default">

            <!-- panel heading -->
            <div class="panel-heading panel-heading-admin">
                <a ui-sref="gallery-create">
                    Create Gallery
                </a>
            </div>

            <div class="panel-body">

                <div class="count-search">

                    <!-- count -->
                    <div class="count">
                        <span ng-bind="vm.total"></span> Galleries
                    </div>

                    <!-- search -->
                    <div id="search">
                        <i class="material-icons i-search">search</i>
                        <input type="text" placeholder="Search" ng-model="vm.search" ng-keydown="vm.liveSearch()" />
                    </div>

                </div>

                <!-- data table -->
                <div class="table-responsive">
                    <table class="table table-striped" id="dataTables-example">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th class="table-actions">Action</th>
                        </tr>

                        </thead>
                        <tbody id="search_result">

                        <tr class="odd gradeX" ng-repeat="p in vm.galleries">
                            <td ng-bind="p.title"></td>

                            <td class="table-actions">
                                <a ui-sref="gallery-edit({id: p.id })">
                                    <div class="action action-edit pull-left">
                                        <i class="material-icons action-icon">create</i>
                                    </div>
                                </a>
                                <a ng-click="vm.showDeleteModal(p)">
                                    <div class="action action-delete pull-left">
                                        <i class="material-icons action-icon">delete</i>
                                    </div>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div> <!-- / data table -->

                <!-- load more -->
                <div id="loadmore" ng-if="vm.next != null">
                    <button class="btn" ng-click="vm.loadMore(vm.next)">Load More</button>
                </div>

            </div>
        </div>
    </div>
</div>
