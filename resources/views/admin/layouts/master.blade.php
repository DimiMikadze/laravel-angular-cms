@include('admin.layouts.header')

<div id="wrapper">

    <!-- Navbar navigation -->
    <nav class="top-navbar navbar navbar-default navbar-static-top" role="navigation" id="navbar">

        <!-- navbar header -->
        <div class="navbar-header">

            <!-- toggle navigation -->
            <button type="button" class="navbar-toggle" ng-init="isCollapsed = true" ng-click="isCollapsed = !isCollapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <!-- logo -->
            <a class="navbar-logo pull-left" ui-sref="dashboard">
                <img src="/admin/images/main/upme.png" alt="Upme logo">
            </a>

        </div>

        <!-- navbar right -->
        <div class="nav navbar-right hidden-xs">
            <div id="admin-info">
                <div class="admin-user pull-left">
                    <a ui-sref="profile" ng-class="{active: mainUrl == 'profile'}">
                        <i class="material-icons">account_box</i>
                        Me
                    </a>
                </div>
                <div class="logout pull-left">
                    <a href="/admin/logout" target="_self">
                        <i class="material-icons">exit_to_app</i>
                        Logout
                    </a>
                </div>
            </div>
        </div>

    </nav> <!-- / Navbar -->

    <!-- Sidebar -->
    <div class="navbar-default sidebar" role="navigation" id="sidebar">
        <div class="sidebar-nav navbar-collapse" ng-class="{collapse: isCollapsed}">
            <div class="sidebar_links">

                <ul class="nav" id="side-menu">
                    <li class='visible-xs' ng-class="{active: mainUrl == 'profile'}">
                        <a ui-sref="profile" ng-click="isCollapsed = !isCollapsed">
                            <i class="material-icons">account_box</i>
                            Me
                        </a>
                    </li>
                    <li ng-class="{active: mainUrl == 'dashboard'}">
                        <a ui-sref="dashboard" ng-click="isCollapsed = !isCollapsed">
                            <i class="material-icons">equalizer</i>
                            Dashboard
                        </a>
                    </li>
                    <li ng-class="{active: mainUrl == 'users'}">
                        <a ui-sref="users" ng-click="isCollapsed = !isCollapsed">
                            <i class="material-icons pull-left">supervisor_account</i>
                            Users
                        </a>
                    </li>
                    <li ng-class="{active: mainUrl == 'posts'}">
                        <a ui-sref="posts" ng-click="isCollapsed = !isCollapsed">
                            <i class="material-icons">subtitles</i>
                            Posts
                        </a>
                    </li>
                    <li ng-class="{active: mainUrl == 'gallery'}">
                        <a ui-sref="gallery" ng-click="isCollapsed = !isCollapsed">
                            <i class="material-icons">monochrome_photos</i>
                            Gallery
                        </a>
                    </li>
                    <li class='visible-xs'>
                        <a href="/admin/logout" target="_self" ng-click="isCollapsed = !isCollapsed">
                            <i class="material-icons">exit_to_app</i>
                            Logout
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    </div> <!-- / sidebar -->

    <!-- page wrapper for angular views-->
    <div id="page-wrapper">

        <!-- Angular views -->
        <div ui-view id="ui-view"></div>


        <div id="github">
            <a href="https://github.com/DimitriMikadze/laravel-angular-cms" target="_blank">
                <i class="fa fa-github-square"></i>
                <p>
                    Fork Me On Github
                </p>
            </a>
        </div>

    </div>
    
</div>

@include('admin.layouts.footer')