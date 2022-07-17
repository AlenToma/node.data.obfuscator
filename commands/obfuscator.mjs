const obfuscator = (text, toFolder, wordCounter, fileType, isJson, includeTypeInImport) => {
  const tohex = true;
  function string_as_unicode_escape(input) {
    function pad_four(input) {
      var l = input.length;
      if (l == 0) return '0000';
      if (l == 1) return '000' + input;
      if (l == 2) return '00' + input;
      if (l == 3) return '0' + input;
      return input;
    }
    var output = '';
    for (var i = 0, l = input.length; i < l; i++)
      output += '\\u' + pad_four(input.charCodeAt(i).toString(16));
    return output;
  }

  function shuffleArray(data) {
    let array = [...data];
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const createVariable = (str) => {
    return "x" + ((str).toString(16)).slice(-4);
  }

  const strArray = []
  for (let i = 0; i < text.length; i++) {
    const c = tohex === true ? `'${string_as_unicode_escape(text.charAt(i))}'` : `'${text.charAt(i)}'`
    const name = `v${c.replace(/'|\\/g, "")}l`;


    strArray.push({
      index: strArray.find((x) => x.name === name)?.index | i,
      name: name,
      file: !strArray.find((x) => x.name === name)
        ? `${c}`
        : '',
    });
  }
  wordCounter = wordCounter || strArray.length;
  const variable = createVariable(Math.floor(text.length ^ wordCounter))
  const data = strArray;
  var shuffledData = shuffleArray(strArray.filter((x) => x.file !== ''));
  let rClass = 'const ' + variable + '= [' + shuffledData.map(x => x.file).join(",") + "]";
  if (!toFolder) {
    rClass += `\nexport default ${data.reduce((arr, v) => {
      var item = shuffledData.findIndex(x => x.name === v.name);
      if (item !== -1)
        arr.push(variable + `[` + ('0X' + item.toString(16).toUpperCase()).slice(-4) + "]")
      return arr;
    }, []).join('+')}`;

  } else {
    const one = ('0X' + (1).toString(16).toUpperCase()).slice(-4);
    const zero = ('0X' + (0).toString(16).toUpperCase()).slice(-4);
    const files = [{ name: variable, content: `${rClass};\nexport default [${variable}, ""];` }];
    let i = 0;

    while (data.length > 0) {
      const vr = createVariable(i ^ wordCounter);
      const pvr = files[files.length - 1].name;
      let file = { name: vr, content: `import ${pvr} from './${pvr}${(includeTypeInImport ? ("." + fileType) : "")}'\nlet ${vr}=${pvr}[${one}];\n` };
      for (let m = 0; m <= wordCounter; m++) {
        if (data.length == 0)
          break;
        var v = data.shift();
        var item = shuffledData.findIndex(x => x.name === v.name);
        const index = ('0X' + item.toString(16).toUpperCase()).slice(-4);

        file.content += `${vr}+=${pvr}[${zero}][${index}];\n`
      }
      if (data.length !== 0) {

        file.content += `export default [${pvr}[${zero}], ${vr}]`;
      } else {
        file.name = "index";

        file.content += isJson === true ? `export default JSON.parse(${vr})` : `export default ${vr}`;
      }


      files.push(file);
      i++
    }
    return files;
  }
  return rClass;
};

export default obfuscator;