<div class="form-group">
    <div class="input-group">
        Images

        <!-- drag and drop -->
        <div ngf-drop
             ngf-select
             ng-model="mymodel.image"
             ngf-drag-over-class="dragover"
             ngf-allow-dir="true"
             accept="image/*"
             ngf-multiple="true"
             ngf-pattern="'image/*'"
             style="padding: 20px; border: 1px solid #ccc; cursor: pointer">Drop Images here or click to Upload
        </div>

        <!-- old browsers -->
        <div ngf-no-file-drop>
            <input type="file" ng-model="mymodel.image" name="image" ngf-select accept="image/*" ngf-max-size="2MB"m >
        </div>

        <!-- image preview -->
        <div class="admin_image_container admin_single_image" ng-show="!mymodel.image.$error && mymodel.image">
            <div ng-repeat="img in mymodel.image"
                class="admin_image"
                ng-class="{admin_image_main: $index == mymodel.mainImage}">

                <div class="admin_image_box">
                    <img ngf-src="!img.$error && img">
                    <p class="delete_img" ng-click="delete({index: $index})">x</p>
                    <p class="main_image" ng-show="$index == mymodel.mainImage" ng-click="main({index: $index})">Main Image</p>
                    <p class="main_image" ng-hide="$index == mymodel.mainImage" ng-click="main({index: $index})">Select as main image</p>
                </div>

            </div>
        </div>

    </div>
</div>