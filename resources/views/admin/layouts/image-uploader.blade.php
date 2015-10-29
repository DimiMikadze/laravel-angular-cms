<div class="form-group">
    <div class="input-group">
        Image

        <!-- drag and drop -->
        <div ngf-drop
             ngf-select
             ng-model="mymodel.image"
             ngf-drag-over-class="dragover"
             ngf-allow-dir="true"
             accept="image/*"
             ngf-pattern="'image/*'"
             style="padding: 20px; border: 1px solid #ccc; cursor: pointer"> Drop image here or click to Upload
        </div>

        <!-- old browsers -->
        <div ngf-no-file-drop>
            <input type="file" ng-model="mymodel.image" name="image" ngf-select accept="image/*" ngf-max-size="2MB" >
        </div>

        <!-- image preview -->
        <div class="admin_image_container admin_single_image" ng-show="!mymodel.image.$error && mymodel.image">
            <div class="admin_image">
                <div class="admin_image_box">
                    <img ngf-src="!mymodel.$error && mymodel.image">
                    <p class="delete_img" ng-click="delete()">x</p>
                </div>
            </div>
        </div>

    </div>
</div>