
<!-- main heading -->
<div class="row">
    <div class="col-lg-12">
        <h3 class="page-header">Dashboard</h3>
        <page-loading ng-show="!vm.ready"></page-loading>
    </div>
</div>

<div class="row" ng-show="vm.ready">

    <!-- users count -->
    <div class="col-md-4 col-sm-12">
        <a ui-sref="users" class="dashboard-link">
            <div class="count-container users-count">
                <div class="count-dark">
                    <i class="material-icons">face</i>
                </div>
                <p>
                    Users
                    <span class="count-number" ng-bind="vm.users_count"></span>
                </p>
            </div>
        </a>
    </div>

    <!-- posts count -->
    <div class="col-md-4 col-sm-12">
        <a ui-sref="posts" class="dashboard-link">
            <div class="count-container posts-count">
                <div class="count-dark">
                    <i class="material-icons">assessment</i>
                </div>
                <p>
                    Posts
                    <span class="count-number" ng-bind="vm.posts_count"></span>
                </p>
            </div>
         </a>
    </div>

    <!-- galleries count -->
    <div class="col-md-4 col-sm-12">
        <a ui-sref="gallery" class="dashboard-link">
            <div class="count-container galleries-count">
                <div class="count-dark">
                    <i class="material-icons">image</i>
                </div>
                <p>
                    Galleries
                    <span class="count-number" ng-bind="vm.galleries_count"></span>
                </p>
            </div>
        </a>
    </div>

</div>