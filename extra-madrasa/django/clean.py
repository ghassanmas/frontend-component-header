import codecs
import logging
import os
import re
import sys

from path import Path as path
from polib import pofile

from i18n import Runner
from i18n.execute import execute

LOG = logging.getLogger(__name__)
DEVNULL = open(os.devnull, "wb")        # pylint: disable=consider-using-with
DUPLICATE_ENTRY_PATTERN = re.compile('#-#-#-#-#.*#-#-#-#-#')


def clean_pofile(pofile_path):
    """
    Clean various aspect of a .po file.

    Fixes:

        - Removes the fuzzy flag on metadata.

        - Removes occurrence line numbers so that the generated files don't
          generate a lot of line noise when they're committed.

    Returns a list of any duplicate entries found.
    """
    # Reading in the .po file and saving it again fixes redundancies.
    pomsgs = pofile(pofile_path)
    # The msgcat tool marks the metadata as fuzzy, but it's ok as it is.
    pomsgs.metadata_is_fuzzy = False
    duplicate_entries = []

    for entry in pomsgs:
        # Remove line numbers
        entry.occurrences = [(filename, None) for filename, __ in entry.occurrences]
        # Check for merge conflicts. Pick the first, and emit a warning.
        if 'fuzzy' in entry.flags:
            # Remove fuzzy from flags
            entry.flags = [f for f in entry.flags if f != 'fuzzy']
            # Save a warning message
            occurrences = [f for (f, __) in entry.occurrences]
            dup_msg = (f'Multiple translations found for single string.\n\t'
                       f'String "{entry.msgid}"\n\tPresent in files {occurrences}'
                       )
            duplicate_entries.append((dup_msg, entry.msgstr))

            # Pick the first entry
            for msgstr in DUPLICATE_ENTRY_PATTERN.split(entry.msgstr):
                # Ignore any empty strings that may result from the split call
                if msgstr:
                    # Set the first one we find to be the right one. Strip to remove extraneous
                    # new lines that exist.
                    entry.msgstr = msgstr.strip()

                    # Raise error if there's new lines starting or ending the id string.
                    if entry.msgid.startswith('\n') or entry.msgid.endswith('\n'):
                        raise ValueError(
                            f'{entry.msgid} starts or ends with a new line character, which is not allowed. '
                            'Please fix before continuing. Source string is found in {entry.occurrences}'
                            .encode('utf-8')
                        )
                    break

    pomsgs.save()
    return duplicate_entries
result = clean_pofile(sys.argv[1])
print(result)
print(sys.argv[1])

