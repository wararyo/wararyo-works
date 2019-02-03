<?php 
$matched = preg_match('/\/(.+)\/(.+)\/?$/',$_SERVER["REQUEST_URI"],$matches);
if($matched){
	$work_slug = $matches[2];
	$url = "https://cdn.contentful.com/spaces/vlu6hvdg3cmf/environments/master/entries/?access_token=69559523b19be9eec1faf2fd6ae3314d24f6ed07b74f0fd96de92b5d208611bf&content_type=work&fields.slug=$work_slug";
	$json = file_get_contents($url);
	if($json) {
		$obj = json_decode($json);
		$ogp = new stdClass();
		$ogp->title =  "wararyo's work - ".$obj->items[0]->fields->title;
		$ogp->image = 'https:'.$obj->includes->Asset[0]->fields->file->url;
		$ogp->description = str_replace(PHP_EOL, '', htmlspecialchars(mb_substr($obj->items[0]->fields->content,0,96)));
	}
}

 ?>
<meta name="description" content="<?=isset($ogp->description)?$ogp->description:'wararyoのポートフォリオサイトです。'?>">
<meta property="og:title" content="<?=isset($ogp->title)?$ogp->title:'wararyo\'s work'?>">
<meta property="og:image" content="<?=isset($ogp->image)?$ogp->image:'https://work.wararyo.com/ogp.jpg'?>">
<meta property="og:description" content="<?=isset($ogp->description)?$ogp->description:'wararyoのポートフォリオサイトです。'?>">