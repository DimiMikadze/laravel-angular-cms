
<!-- flash message -->
<flash-message></flash-message>

<!-- main header -->
<div class="row">
    <div class="col-lg-12">
        <h3 class="page-header">Me</h3>
        <page-loading ng-show="!vm.ready"></page-loading>
    </div>
</div>

<div class="row" ng-show="vm.ready">
    <div class="col-lg-12">

        <div class="panel panel-default">

            <!-- heading -->
            <div class="panel-heading panel-heading-admin">
                <span ng-bind="vm.authUser.name"></span>
            </div>

            <div class="panel-body">

                <!-- name -->
                <div class="form-group">
                    <div class="input-group">
                        <input type="text" placeholder="Name" class="form-control" ng-model="vm.authUser.name"/>
                    </div>
                </div>

                <!-- email -->
                <div class="form-group">
                    <div class="input-group">
                        <input type="email" placeholder="Email" class="form-control" ng-model="vm.authUser.email"/>
                    </div>
                </div>

                <!-- Old password -->
                <div class="form-group">
                    <div class="input-group">
                        <input type="password" placeholder="Password" class="form-control" ng-model="vm.authUser.oldpassword"/>
                    </div>
                </div>

                <!-- Password -->
                <div class="form-group">
                    <div class="input-group">
                        <input type="password" placeholder="New password" class="form-control" ng-model="vm.authUser.password"/>
                    </div>
                </div>

                <!-- Repeat password -->
                <div class="form-group">
                    <div class="input-group">
                        <input type="password" placeholder="Repeat new password" class="form-control" ng-model="vm.authUser.repassword"/>
                    </div>
                </div>

                <!-- role -->
                <div class="form-group">
                    Role: <span ng-bind="vm.authUser.user_roles.role | roles"></span>
                </div>

                <!-- image -->
                <div class="form-group" ng-show="!vm.authUser.image">
                    <div class="input-group">
                        <div class="uploader">
                            <button onclick="document.getElementById('single-uploader').click()" class="btn btn-upload">
                                Upload Image
                                <i class="material-icons upload-icon">cloud_upload</i>
                            </button>
                            <input type="file" fileread="vm.authUser.file" id="single-uploader">
                        </div>
                    </div>
<<<<<<< HEAD
                </div>

                <!-- image preview -->
                <div class="image-container" ng-show="vm.authUser.file">
                    <div class="img-btn-container animated bounceInDown">
                        <div class="a-image">
                            <img ng-src="@{{ vm.authUser.file.isImage && vm.authUser.file.url || null }}" ng-show="vm.authUser.file.isImage">
                            <div class="not-image" ng-show="!vm.authUser.file.isImage">
                                <p><i class="material-icons">warning</i></p>
                                <p>File is not an Image</p>
=======

                    <input type="hidden" ng-model="vm.isUploaded">

                    <!-- image uploader -->
                    <div image-uploader mymodel="vm.authUser" delete="vm.deleteImage()" ng-if="!vm.isUploaded"></div>

                    <!-- image -->
                    <div class="admin_image_container admin_single_image" ng-if="vm.isUploaded">
                        <div class="admin_image">
                            <div class="admin_image_box">
                                <img ng-src="/admin/images/users/@{{ vm.authUser.image }}">
                                <p class="delete_img" ng-click="vm.deleteImage(vm.authUser.id)">x</p>
>>>>>>> origin/master
                            </div>
                        </div>
                        <button class="btn btn-dlt-img" ng-click="vm.hideImage()">Delete</button>
                    </div>
                </div>

                <!-- uploaded image -->
                <div class="image-container" ng-show="vm.authUser.image">
                    <div class="img-btn-container">
                        <div class="a-image">
                            <img ng-src="@{{ vm.authUser.image && 'admin/images/users/' + vm.authUser.image || null }}">
                        </div>
                        <button class="btn btn-dlt-img" ng-click="vm.deleteImage(vm.authUser.id)">Delete</button>
                    </div>
                </div>

                <!-- errors -->
                <div class="alert alert-danger" role="alert" ng-if="vm.errors">
                    <ul ng-repeat="error in vm.errors">
                        <li ng-bind="error"></li>
                    </ul>
                </div>

                <!-- Submit -->
                <div class="form-submit">
                    <img ng-show="vm.loading" src='/admin/images/main/preloader.gif' alt='preloader gif'>
                    <button ng-show="!vm.loading"  ng-click="vm.update()" class="btn btn-submit">Update</button>
                </div>

            </div> <!-- / panel body -->

        </div>
    </div>
</div>
