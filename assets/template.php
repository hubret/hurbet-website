<?php global $artifact; ?>

<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title><?php echo ucfirst($artifact->attributes['name']);?></title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css">
        <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="assets/styles/style.css?ver=<?php echo filemtime('assets/styles/style.css');?>">
    </head>

    <body>
        <div id="main">
            <div id="header">
                <div class="nav">
                    <a href="/"><span class="text">hubret</span></a>
                </div>
                <div id="sketch" class="header-image" style="background-image: url(<?php echo $artifact->attributes['image'];?>)">
                    <span class="header-title-container"><?php echo $artifact->attributes['image name'];?></span>
                </div>
            </div>
            <div id="body">
                <div id="title">
                    "<?php echo $artifact->attributes['title'];?>"
                </div>
                <div id="body-content">
                    <?php echo $artifact->attributes['content'];?>
                </div>
            </div>
            <div id="footer">
                Powered by <a href="https://github.com/v-exec/Purity" class="external">Purity</a>.<br>
                <a href="/hubret">Contact</a>
            </div>
        </div>
        <script src="assets/scrambler.js"></script>
        <?php if(isset($artifact->attributes['sketch'])): ?>
            <script src="<?php echo $artifact->attributes['sketch']?>"></script>
        <?php endif; ?>
    </body>
</html>