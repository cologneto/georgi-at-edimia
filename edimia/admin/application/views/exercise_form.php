<?=form_open('exercises/save', array("id" => "exercise-form", "autocomplete" => "off"));?>
<input type="hidden" name="exerciseFK" value="<?=$oExe->id;?>" />
<input type="hidden" name="number_range" id="frm-num-range" value="<?=$oExe->number_range;?>" />
<input type="hidden" name="cache_recalc" id="frm-force_cache_recalc" value="no" />
<input type="hidden" name="scroll_amount" id="frm-scroll_amount" value="no" />

<input type="hidden" name="fn_solve" id="frm-fn_solve" value="" />
<input type="hidden" name="fn_revert" id="frm-fn_revert" value="" />
<input type="hidden" name="fn_set" id="frm-fn_set" value="" />
<input type="hidden" name="fn_markwrong" id="frm-fn_markwrong" value="" />
<input type="hidden" name="fn_markcorrect" id="frm-fn_markcorrect" value="" />
<input type="hidden" name="callback" id="frm-callback" value="" />

<div class="param-section top">
    <strong>Exercise title: </strong><input type="text" name="exercise_title" value="<?=$oExe->title;?>" />
</div>
<div class="param-section">
    <strong>Exercise Options</strong>
    <div class="grid">
        <div class="span12">
            <div class="header">Required modules</div>
            <div class="grid">
                <?=$modules;?>
            </div>
        </div>
        <div class="span4">
            <div class="header">Numbers range</div>
            <div>
                [<?=$oExe->number_range;?>]<i class="pull-right">Note: <?=anchor("moments/" . $oExe->momentFK, "edit moment");?> to change number range</i>
            </div>
            
            <div class="header">Operations</div>
            <div>
                <div><input type="checkbox" name="operation[]" <?=(isset($oExe->params->operation)&&$oExe->params->operation=="addition")||(isset($oExe->params->operationMix)&&in_array("addition", $oExe->params->operationMix))?"checked":"";?> value="addition" id="frm-cb-math-a">&nbsp;<label for="frm-cb-math-a">Addition</label></div>
                <div><input type="checkbox" name="operation[]" <?=(isset($oExe->params->operation)&&$oExe->params->operation=="subtraction")||(isset($oExe->params->operationMix)&&in_array("subtraction", $oExe->params->operationMix))?"checked":"";?> value="subtraction" id="frm-cb-math-s">&nbsp;<label for="frm-cb-math-s">Subtraction</label></div>
            </div>
        
            <div class="header">Parameters</div>
            <div>
                <div><input type="checkbox" name="params[]" <?=isset($oExe->params->bShowOKButton)&&$oExe->params->bShowOKButton?"checked":"";?> value="bShowOKButton" id="frm-cb-param-ok">&nbsp;<label for="frm-cb-param-ok">Show OK button</label></div>
                <div><input type="checkbox" name="params[]" <?=isset($oExe->params->bExcludeZero)&&$oExe->params->bExcludeZero?"checked":"";?> value="bExcludeZero" id="frm-cb-param-ex">&nbsp;<label for="frm-cb-param-ex">Exclude 0 (zero)</label></div>
                <div><input type="checkbox" name="params[]" <?=isset($oExe->params->bShowDragArea)&&$oExe->params->bShowDragArea?"checked":"";?> value="bShowDragArea" id="frm-cb-param-da">&nbsp;<label for="frm-cb-param-da">Show drag area</label></div>
                <div><input type="checkbox" name="params[]" <?=isset($oExe->params->bShowNumberDots)&&$oExe->params->bShowNumberDots?"checked":"";?> value="bShowNumberDots" id="frm-cb-param-nd">&nbsp;<label for="frm-cb-param-nd">Show number dots</label></div>
                <div style="padding-left: 25px;">Number of answer pairs: <input name="num_pairs" value="<?=isset($oExe->params->num_pairs)?$oExe->params->num_pairs:"";?>" type="text" size="2" maxlength="2" style="width: 30px" autocomplete="off" /></div>
            </div>
        </div>
        <div class="span8">
            <div class="header">Templates</div>
            <div class="grid">
                <?=$templates;?>
            </div>
        </div>
    </div>
</div>

<div class="param-section">
    <strong>Exercise flow code</strong>&nbsp;<input type="checkbox" id="cb_force_cache_recalc" name="force_cache_recalc" value="no" /> <label for="cb_force_cache_recalc">Force cache update</label>
    <div class="grid">
        <div class="span3">
            <div class="header">Answer analyzer</div>
            <div class="grid">
                <div class="span4">Function</div>
                <div class="span8"><input type="text" class="exe-params" name="answer_function" value="<?=isset($oExe->config->answer_function)?htmlspecialchars($oExe->config->answer_function, ENT_QUOTES):"";?>" style="width: 100%" /></div>
                <div class="span4">Selectors</div>
                <div class="span8"><input type="text" class="exe-params" name="answer_selectors" value="<?=isset($oExe->config->answer_selectors)?htmlspecialchars($oExe->config->answer_selectors, ENT_QUOTES):"";?>" style="width: 100%" /><i>Note: "selector1","selector2"</i></div>
            </div>
        </div>
        <div class="span3">
            <div class="header">Layout classes</div>
            <div class="grid">
                <div class="span4">CSS classes</div>
                <div class="span8"><input type="text" class="exe-params" name="config_classes" value="<?=isset($oExe->config->config_classes)?htmlspecialchars($oExe->config->config_classes, ENT_QUOTES):"";?>" style="width: 100%" /><i>Note: separate class names with space</i></div>
            </div>
        </div>
        <div class="span6">
            <div class="header">View current exercise Init Params [<a href="" id="lnk-expand-params">+</a>]</strong></div>
            <textarea class="params"><?=$oExe->params_string;?></textarea>
        </div>
        <div class="span12">
            <div class="header no-border">Function exercise.set()</div>
            <!--<textarea name="fn_set" class="exe-funcs"><?=$oExe->fn_set;?></textarea>-->
            <div id="code-fn_set" class="exe-funcs textarea"><?=$oExe->fn_set;?></div>
        </div>
        <div class="span12">
            <div class="header no-border">Function exercise.revert_wrong()</div>
            <!--<textarea name="fn_revert" class="exe-funcs small"><?=$oExe->fn_revert;?></textarea>-->
            <div id="code-fn_revert" class="exe-funcs small textarea"><?=$oExe->fn_revert;?></div>
        </div>
        <div class="span12">
            <div class="header no-border">Function exercise.solve()</div>
            <!--<textarea name="fn_solve" class="exe-funcs small"><?=$oExe->fn_solve;?></textarea>-->
            <div id="code-fn_solve" class="exe-funcs small textarea"><?=$oExe->fn_solve;?></div>
        </div>
        <div class="span12">
            <div class="header no-border">Function exercise.mark_correct()</div>
            <!--<textarea name="fn_markcorrect" class="exe-funcs small"><?=$oExe->fn_markcorrect;?></textarea>-->
            <div id="code-fn_markcorrect" class="exe-funcs small textarea"><?=$oExe->fn_markcorrect;?></div>
        </div>
        <div class="span12">
            <div class="header no-border">Function exercise.mark_wrong()</div>
            <!--<textarea name="fn_markwrong" class="exe-funcs small"><?=$oExe->fn_markwrong;?></textarea>-->
            <div id="code-fn_markwrong" class="exe-funcs small textarea"><?=$oExe->fn_markwrong;?></div>
        </div>
    </div>
</div>
<div class="param-section">
    <strong>Initialization callback</strong>
    <?=$template_callbacks!=''?'<div class="container-template-callbacks"><pre>'.$template_callbacks.'</pre></div>':'';?>
    <!--<textarea class="callback" name="callback"><?=$oExe->callback;?></textarea>-->
    <div id="code-callback" class="callback textarea"><?=$oExe->callback;?></div>
</div>
</form>