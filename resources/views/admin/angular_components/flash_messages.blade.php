<div class="alert animated rubberBand flash flash-success" ng-show="vm.flash">
    <i class="material-icons">check_circle</i>
    <span ng-bind="vm.flash"></span>
</div>
<div class="alert animated swing flash flash-error" ng-show="vm.flashError">
    <i class="material-icons">error</i>
    <span ng-bind="vm.flashError"></span>
</div>