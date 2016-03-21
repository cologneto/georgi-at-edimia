<nav>
    <div class="item arrow">dashboard</div>
    <div class="item <?=isset($active)&&$active=="blocks"?"active":"";?>"><?=anchor("blocks", "Blocks");?></div>
    <div class="item <?=isset($active)&&$active=="moments"?"active":"";?>"><?=anchor("moments", "Moments");?></div>
    <div class="item <?=isset($active)&&$active=="exercises"?"active":"";?>"><?=anchor("exercises", "Exercises");?></div>
    <div class="item <?=isset($active)&&$active=="staticjs"?"active":"";?>"><?=anchor("staticjs", "Static js");?></div>
    <div class="item <?=isset($active)&&$active=="modules"?"active":"";?>"><?=anchor("modules", "Modules");?></div>
    <div class="item <?=isset($active)&&$active=="templates"?"active":"";?>"><?=anchor("templates", "Templates");?></div>
</nav>