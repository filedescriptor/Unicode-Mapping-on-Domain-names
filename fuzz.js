// Only fuzz non-ascii characters
for (let codePoint = 0x80; codePoint < 0x10ffff; codePoint++) {
    let chr = String.fromCodePoint(codePoint);
    try {
        let normalizedDomain = new URL(`http://foo${chr}bar`).host;
        // Not interested in punycode or non-mapped characters
        if (!normalizedDomain.startsWith('xn--') && normalizedDomain != `foo${chr}bar`) {
            console.log(
                `U+${codePoint.toString(16)}`, 
                chr, 
                normalizedDomain.replace(/foo|bar/g, '') || 'Ignored'
            );
        }
    } catch (e) {
        // Most probably invalid character in a domain
    }
}
