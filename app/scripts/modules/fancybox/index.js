import 'fancybox/dist/css/jquery.fancybox.css';
require('fancybox')($);

export default function fancybox() {

    $(document).ready(function () {
        $('.fancybox').fancybox({
            padding: 0,
            openEffect: 'elastic'
        });
    });
}