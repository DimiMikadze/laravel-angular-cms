<!-- flash message -->
<flash-message></flash-message>

<!-- Confirm delete modal -->
<div delete-modal ng-if="vm.deleteModal" cancel="vm.hideDeleteModal()" delete="vm.deleteUser(user)"></div>

<!-- main heading -->
<div class="row">
    <div class="col-lg-12">
        <h3 class="page-header">Users</h3>
        <page-loading ng-show="!vm.ready"></page-loading>
    </div>
</div>

<div class="row" ng-show="vm.ready">
    <div class="col-lg-12">
        <div class="panel panel-default">

            <!-- panel heading -->
            <div class="panel-heading">
                <a ui-sref="user-create">
                    Create User
                </a>
            </div>

            <div class="panel-body">

                <div class="count-search">

                    <!-- count -->
                    <div class="count">
                        <span ng-bind="vm.total"></span> users
                    </div>

                    <!-- filter by user role -->
                    <div class="filter pull-left">
                        <span>Filter By:</span>
                        <select ng-model="vm.roleFilter" ng-change="vm.filterByRole()" ng-init="vm.roleFilter = 'Role'">
                            <option>Role</option>
                            <option value="0">Not Auth</option>
                            <option value="1">Auth</option>
                            <option value="2">Admin</option>
                            <option value="3">Super Admin</option>
                            <option value="4">Owner</option>
                        </select>
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
                            <th>Role</th>
                            <th>Email</th>
                            <th class="table-actions">Action</th>
                        </tr>

                        </thead>
                        <tbody id="search_result">

                        <tr class="odd gradeX" ng-repeat="u in vm.users">
                                <td ng-bind="u.name"></td>
                                <td ng-bind="u.user_roles.role | roles"></td>
                                <td ng-bind="u.email"></td>
                                <td class="table-actions">
                                    <a ui-sref="user-edit({id: u.id })">
                                        <div class="action action-edit pull-left">
                                            <i class="material-icons action-icon">create</i>
                                        </div>
                                    </a>
                                    <a ng-click="vm.showDeleteModal(u)" ng-if="vm.authUser.user_roles.role > u.user_roles.role">
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
                    <button ng-click="vm.loadMore(vm.next)" class="btn">Load More</button>
                </div>

            </div>
        </div>
    </div>
</div>
