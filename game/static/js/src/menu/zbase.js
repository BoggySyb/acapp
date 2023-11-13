class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
            <div class="ac-game-menu"> 
                <div class="ac-game-menu-field">
                    <div class="ac-game-menu-field-item ac-game-menu-field-single-mode">单人模式</div>
                    <br>
                    <div class="ac-game-menu-field-item ac-game-menu-field-multi-mode">多人模式</div>
                    <br>
                    <div class="ac-game-menu-field-item ac-game-menu-field-setting">设置</div>
                </div>
            </div>
        `);
        this.$menu.hide();
        this.root.$ac_game.append(this.$menu);
        this.$single = this.$menu.find('.ac-game-menu-field-single-mode');
        this.$multi = this.$menu.find('.ac-game-menu-field-multi-mode');
        this.$settings = this.$menu.find('.ac-game-menu-field-setting');

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$single.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi.click(function(){
            console.log("click multi mode");
        });
        this.$settings.click(function(){
            outer.root.settings.logout_on_remote();
        });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }
}