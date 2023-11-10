class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
            <div class="ac_game_menu"> 
                <div class="ac_game_menu_field">
                    <div class="ac_game_menu_field_item ac_game_menu_field_single_mode">单人模式</div>
                    <br>
                    <div class="ac_game_menu_field_item ac_game_menu_field_multi_mode">多人模式</div>
                    <br>
                    <div class="ac_game_menu_field_item ac_game_menu_field_setting">设置</div>
                </div>
            </div>
        `);
        this.$menu.hide();
        this.root.$ac_game.append(this.$menu);
        this.$single = this.$menu.find('.ac_game_menu_field_single_mode');
        this.$multi = this.$menu.find('.ac_game_menu_field_multi_mode');
        this.$settings = this.$menu.find('.ac_game_menu_field_setting');

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