function inIframe () {
    try {
      return window.self !== window.top
    } catch (e) {
      return true
    }
  }
  
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
      value: function(search, rawPos) {
        var pos = rawPos > 0 ? rawPos|0 : 0;
        return this.substring(pos, pos + search.length) === search;
      }
    });
  }
  
  function hostingDomainWithoutWWW() {
    if (document.referrer) {
      var a = document.createElement('a');
      a.href = document.referrer;
      var domain = a.hostname;
      return domain.startsWith("www.") ? domain.slice("www.".length) : domain;
    }
    else{
      return undefined;
    }
  }
  
  if(inIframe()) {
    var hostingDomain = hostingDomainWithoutWWW();
    if(hostingDomain !== 'solitaireparadise.com' && hostingDomain !== 'mahjongheaven.com') {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'width: 100%; height: 100%; z-index: 9999999; background-color: #000; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);';
      
      var link = document.createElement('a');
      link.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #fff; font-size: 16px; font-weight: bold; font-family: helvetica, sans-serif; text-decoration: none;';
      link.setAttribute('href', spGameInfo.url + '?utm_source=' + hostingDomain + '&utm_medium=referral&utm_campaign=' + spGameInfo.slug);
      link.setAttribute('target', '_blank');
      
      var img = document.createElement('img');
      img.style.cssText = 'border-radius: 6px;';
      img.setAttribute('src', spGameInfo.img);
  
      var br = document.createElement('br');
      var br2 = document.createElement('br');
  
      var linkText = document.createElement('span');
      linkText.innerHTML = 'Play ' + spGameInfo.name;
  
      link.append(img);
      link.append(br);
      link.append(br2);
      link.append(linkText);
  
      overlay.append(link);
  
      document.body.append(overlay);
    }
  }
