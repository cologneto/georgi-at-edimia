<div class="container-exercise">
    <div class="exercise-picker">
        <div class="header">
            Select a block
        </div>
        <div class="select">
            <?=$blocks;?>
        </div>
        <div class="header">
            Select a moment
        </div>
        <div class="select">
            <?=$moments;?>
        </div>
        <div class="header">
            Select an exercise
        </div>
        <div class="select">
            <?=$exercises;?>
        </div>
        <div class="controls">
            <div id="exercise-form-submit" class="button <?=$button_disabled;?>"><i class="fa fa-save"></i>&nbsp;&nbsp;&nbsp;Save exercise</div>
        </div>
    </div>
    <div class="exercise-details-contaner">
        <?=$exercise_form;?>
    </div>
</div>